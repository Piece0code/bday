/**
 * ============================================================================
 * 🎁 APPLICATION PRINCIPALE / BIRTHDAY GIFTS & DEDICATED VIDEO PAGE ENGINE
 * ============================================================================
 */

(function () {
  const config = window.BIRTHDAY_CONFIG || { videos: [] };
  const videos = Array.isArray(config.videos) ? config.videos : [];
  const STORAGE_KEY = "bday_opened_gifts_v1";

  // Shared DOM Elements
  const heroBadge = document.getElementById("hero-badge");
  const heroTitleFr = document.getElementById("hero-title-fr");
  const heroRecipient = document.getElementById("hero-recipient");
  const heroTitleEs = document.getElementById("hero-title-es");
  const welcomeFr = document.getElementById("welcome-fr");
  const welcomeEs = document.getElementById("welcome-es");
  const letterSignature = document.getElementById("letter-signature");
  const celebrateBtn = document.getElementById("celebrate-btn");

  // Home Page DOM Elements
  const videoGrid = document.getElementById("video-grid");
  const giftsProgressPill = document.getElementById("gifts-progress-pill");

  // Dedicated Gift Video Page DOM Elements (gift.html)
  const playerWrapper = document.getElementById("player-wrapper");
  const mainVideo = document.getElementById("main-video");
  const nativeTrack = document.getElementById("native-subtitle-track");
  const subtitleBox = document.getElementById("subtitle-box");
  const subtitleLineFr = document.getElementById("subtitle-line-fr");
  const subtitleLineEs = document.getElementById("subtitle-line-es");

  const missingVideoOverlay = document.getElementById("missing-video-overlay");
  const missingVideoPath = document.getElementById("missing-video-path");
  const demoSubtitlesBtn = document.getElementById("demo-subtitles-btn");

  const currentVideoTitle = document.getElementById("current-video-title");
  const currentVideoSpeaker = document.getElementById("current-video-speaker");
  const currentVideoDescription = document.getElementById("current-video-description");
  const videoCounter = document.getElementById("video-counter");

  const prevVideoBtn = document.getElementById("prev-video-btn");
  const nextVideoBtn = document.getElementById("next-video-btn");
  const subModeButtons = document.querySelectorAll("[data-sub-mode]");
  const subSizeBtn = document.getElementById("sub-size-btn");
  const autoplayToggle = document.getElementById("autoplay-toggle");

  // State
  let currentIndex = 0;
  let currentCues = [];
  let subtitleMode = "fr"; // "fr" | "bilingual" | "off"
  let subtitleSizeIndex = 0; // 0: normal, 1: lg, 2: xl
  const sizeClasses = ["", "sub-size-lg", "sub-size-xl"];
  let demoTimer = null;
  let activeBlobTrackUrl = null;

  /**
   * Helpers for tracking which gifts have been unwrapped
   */
  function getOpenedGifts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (_e) {
      return [];
    }
  }

  function markGiftOpened(id) {
    try {
      const opened = new Set(getOpenedGifts());
      opened.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(opened)));
    } catch (_e) {
      // Ignore storage errors in private browsing
    }
  }

  /**
   * 1. Initialize Hero & Personalization Texts (Home Page)
   */
  function initHeroText() {
    if (config.badgeText && heroBadge) heroBadge.textContent = config.badgeText;
    if (config.heroTitleFr && heroTitleFr) heroTitleFr.textContent = config.heroTitleFr;
    if (config.recipientName && heroRecipient) heroRecipient.textContent = config.recipientName;
    if (config.heroTitleEs && heroTitleEs) heroTitleEs.textContent = config.heroTitleEs;
    if (config.welcomeMessageFr && welcomeFr) welcomeFr.textContent = config.welcomeMessageFr;
    if (config.welcomeMessageEs && welcomeEs) welcomeEs.textContent = config.welcomeMessageEs;
    if (config.signature && letterSignature) letterSignature.textContent = config.signature;
  }

  /**
   * 2. Render Wrapped Birthday Presents Grid on index.html
   */
  function renderGiftsGrid() {
    if (!videoGrid) return;
    videoGrid.innerHTML = "";

    const openedIds = new Set(getOpenedGifts());
    if (giftsProgressPill) {
      giftsProgressPill.textContent = `🎁 ${openedIds.size} / ${videos.length} Cadeaux ouverts • Regalos abiertos`;
    }

    const bows = ["🎀", "🎁", "🎀", "✨"];

    videos.forEach((item, index) => {
      const isOpened = openedIds.has(item.id);
      const numStr = String(index + 1).padStart(2, "0");
      const bowIcon = bows[index % bows.length];

      const card = document.createElement("button");
      card.type = "button";
      card.className = `gift-card ${isOpened ? "is-opened" : ""}`;
      card.setAttribute("aria-label", `Ouvrir le cadeau #${numStr} : ${item.title}`);

      card.innerHTML = `
        <div class="gift-bow" aria-hidden="true">${bowIcon}</div>
        <div class="gift-lid" aria-hidden="true"></div>
        <div class="gift-box-body">
          <div class="gift-ribbon-v" aria-hidden="true"></div>
          <div class="gift-ribbon-h" aria-hidden="true"></div>
          <div class="gift-tag">
            <div class="gift-tag-top">
              <span class="gift-number-badge">🎁 Cadeau #${numStr}</span>
              ${
                isOpened
                  ? `<span class="gift-opened-badge">✨ Ouvert</span>`
                  : `<span class="gift-opened-badge" style="background:rgba(255,117,140,0.2);border-color:rgba(255,117,140,0.5);color:#ffd1da;">À ouvrir !</span>`
              }
            </div>
            <h3 class="gift-from">${item.speaker || "Surprise"}</h3>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        markGiftOpened(item.id);
        card.classList.add("unwrapping");
        launchConfetti();
        setTimeout(() => {
          window.location.href = `gift.html?id=${encodeURIComponent(item.id)}`;
        }, 380);
      });

      videoGrid.appendChild(card);
    });
  }

  /**
   * 3. Parse WebVTT (.vtt) or SubRip (.srt) text into cue objects:
   *    [{ start: number, end: number, fr: string, es?: string }]
   */
  function parseSubtitleText(rawText, fallbackCues = []) {
    if (!rawText || typeof rawText !== "string") return fallbackCues;

    const lines = rawText
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .split("\n");

    const parsed = [];
    let i = 0;

    function parseTimestamp(ts) {
      const clean = ts.trim().replace(",", ".");
      const parts = clean.split(":");
      if (parts.length === 3) {
        return (
          parseFloat(parts[0]) * 3600 +
          parseFloat(parts[1]) * 60 +
          parseFloat(parts[2])
        );
      }
      if (parts.length === 2) {
        return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
      }
      return 0;
    }

    while (i < lines.length) {
      const line = lines[i].trim();

      if (!line || line.startsWith("WEBVTT") || line.startsWith("NOTE")) {
        i++;
        continue;
      }

      let timingLine = line;
      if (!timingLine.includes("-->") && i + 1 < lines.length && lines[i + 1].includes("-->")) {
        i++;
        timingLine = lines[i].trim();
      }

      if (timingLine.includes("-->")) {
        const [startRaw, endRaw] = timingLine.split("-->");
        const start = parseTimestamp(startRaw);
        const end = parseTimestamp(endRaw.trim().split(/\s+/)[0]);

        i++;
        const textLines = [];
        while (i < lines.length && lines[i].trim() !== "") {
          textLines.push(lines[i].trim());
          i++;
        }

        const fullText = textLines.join("\n");
        if (fullText) {
          const matchingFallback = fallbackCues.find(
            (c) => Math.abs(c.start - start) < 0.5
          );
          parsed.push({
            start,
            end,
            fr: fullText,
            es: matchingFallback?.es || ""
          });
        }
      } else {
        i++;
      }
    }

    return parsed.length > 0 ? parsed : fallbackCues;
  }

  /**
   * 4. Build a dynamic WebVTT Blob URL so native fullscreen also has subtitles
   */
  function attachNativeTrackFromCues(cues) {
    if (!nativeTrack || !mainVideo) return;

    if (activeBlobTrackUrl) {
      URL.revokeObjectURL(activeBlobTrackUrl);
      activeBlobTrackUrl = null;
    }

    if (!cues || cues.length === 0) return;

    function formatVttTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = (seconds % 60).toFixed(3);
      return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(6, "0")}`;
    }

    let vttContent = "WEBVTT\n\n";
    cues.forEach((cue, idx) => {
      const text =
        subtitleMode === "bilingual" && cue.es
          ? `${cue.fr}\n(${cue.es})`
          : cue.fr;
      vttContent += `${idx + 1}\n${formatVttTime(cue.start)} --> ${formatVttTime(cue.end)}\n${text}\n\n`;
    });

    const blob = new Blob([vttContent], { type: "text/vtt;charset=utf-8" });
    activeBlobTrackUrl = URL.createObjectURL(blob);
    nativeTrack.src = activeBlobTrackUrl;

    if (mainVideo.textTracks && mainVideo.textTracks[0]) {
      mainVideo.textTracks[0].mode = "hidden";
    }
  }

  /**
   * 5. Render active subtitle cue in the External Subtitle Bar right under the video
   */
  function formatShortTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function renderTranscriptList() {
    const transcriptList = document.getElementById("transcript-list");
    if (!transcriptList) return;
    transcriptList.innerHTML = "";

    currentCues.forEach((cue, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "transcript-item";
      btn.dataset.cueIndex = String(idx);
      btn.innerHTML = `
        <span class="transcript-time">${formatShortTime(cue.start)}</span>
        <div class="transcript-texts">
          <div class="transcript-fr">${cue.fr}</div>
          ${cue.es ? `<div class="transcript-es">🇪🇸 ${cue.es}</div>` : ""}
        </div>
      `;
      btn.addEventListener("click", () => {
        if (!mainVideo) return;
        mainVideo.currentTime = cue.start + 0.05;
        mainVideo.play().catch(() => {});
      });
      transcriptList.appendChild(btn);
    });
  }

  function updateSubtitleDisplay(currentTime) {
    if (!subtitleBox || !subtitleLineFr) return;

    const externalBar = document.getElementById("custom-subtitle-overlay");
    if (subtitleMode === "off" || !currentCues.length) {
      if (externalBar) externalBar.classList.add("hidden");
      return;
    }
    if (externalBar) externalBar.classList.remove("hidden");

    // 1. Exact match for current timestamp
    let activeIndex = currentCues.findIndex(
      (cue) => currentTime >= cue.start && currentTime <= cue.end
    );

    // 2. If in a brief pause between sentences, keep showing the most recent cue (or first cue at 0:00)
    if (activeIndex === -1 && currentCues.length > 0) {
      for (let idx = currentCues.length - 1; idx >= 0; idx--) {
        if (currentTime >= currentCues[idx].start) {
          activeIndex = idx;
          break;
        }
      }
      if (activeIndex === -1) {
        activeIndex = 0;
      }
    }

    const transcriptList = document.getElementById("transcript-list");
    if (transcriptList) {
      const items = transcriptList.querySelectorAll(".transcript-item");
      items.forEach((el, idx) => {
        el.classList.toggle("active", idx === activeIndex);
      });
    }

    const activeCue = activeIndex >= 0 ? currentCues[activeIndex] : null;

    if (!activeCue) {
      subtitleBox.classList.add("hidden");
      return;
    }

    subtitleLineFr.textContent = activeCue.fr;

    if (subtitleMode === "bilingual" && activeCue.es) {
      subtitleLineEs.textContent = activeCue.es;
      subtitleLineEs.classList.remove("hidden");
    } else if (subtitleLineEs) {
      subtitleLineEs.classList.add("hidden");
    }

    subtitleBox.classList.remove("hidden");
  }

  /**
   * 6. Load Subtitles for a Video Entry (from .vtt file or inline fallback)
   */
  async function loadSubtitlesForVideo(videoItem) {
    const fallbackCues = Array.isArray(videoItem.cues) ? videoItem.cues : [];
    currentCues = fallbackCues;

    if (videoItem.subtitleFr) {
      try {
        const response = await fetch(encodeURI(videoItem.subtitleFr));
        if (response.ok) {
          const text = await response.text();
          currentCues = parseSubtitleText(text, fallbackCues);
        }
      } catch (_err) {
        currentCues = fallbackCues;
      }
    }

    attachNativeTrackFromCues(currentCues);
    renderTranscriptList();
    updateSubtitleDisplay(mainVideo ? mainVideo.currentTime || 0 : 0);
  }

  /**
   * 7. Load and Play Selected Gift Video on gift.html
   */
  async function selectVideo(index, shouldAutoPlay = true, updateUrl = true) {
    if (!mainVideo || index < 0 || index >= videos.length) return;

    stopDemoSubtitles();
    currentIndex = index;
    const item = videos[currentIndex];

    markGiftOpened(item.id);

    if (updateUrl && window.history && window.history.replaceState) {
      const newUrl = `gift.html?id=${encodeURIComponent(item.id)}`;
      window.history.replaceState({ id: item.id }, "", newUrl);
    }

    document.title = `🎁 ${item.title} • Joyeux Anniversaire !`;

    const numStr = String(currentIndex + 1).padStart(2, "0");
    if (currentVideoTitle) currentVideoTitle.textContent = item.title || `Cadeau #${numStr}`;
    if (currentVideoSpeaker) currentVideoSpeaker.textContent = item.speaker || "Message d'anniversaire";
    if (currentVideoDescription) currentVideoDescription.textContent = item.description || "";
    if (videoCounter) videoCounter.textContent = `🎁 Cadeau #${numStr}`;

    if (prevVideoBtn) prevVideoBtn.disabled = currentIndex === 0;
    if (nextVideoBtn) nextVideoBtn.disabled = currentIndex === videos.length - 1;

    if (missingVideoOverlay) missingVideoOverlay.classList.add("hidden");
    if (missingVideoPath) missingVideoPath.textContent = item.src;

    if (item.poster) {
      mainVideo.poster = item.poster;
    } else {
      mainVideo.removeAttribute("poster");
    }

    mainVideo.src = encodeURI(item.src);
    mainVideo.load();

    await loadSubtitlesForVideo(item);

    if (shouldAutoPlay) {
      mainVideo.play().catch(() => {
        // Browser may require one click if opened without prior gesture
      });
    }
  }

  /**
   * 8. Demo Subtitles Simulation
   */
  function startDemoSubtitles() {
    stopDemoSubtitles();
    if (!currentCues.length) return;

    if (missingVideoOverlay) missingVideoOverlay.classList.add("hidden");
    let simulatedTime = 0;
    const maxTime = currentCues[currentCues.length - 1].end + 1;

    updateSubtitleDisplay(0.1);

    demoTimer = setInterval(() => {
      simulatedTime += 0.25;
      updateSubtitleDisplay(simulatedTime);

      if (simulatedTime > maxTime) {
        stopDemoSubtitles();
        if (missingVideoOverlay) missingVideoOverlay.classList.remove("hidden");
      }
    }, 250);
  }

  function stopDemoSubtitles() {
    if (demoTimer) {
      clearInterval(demoTimer);
      demoTimer = null;
    }
  }

  /**
   * 9. Event Listeners for Gift Video Page
   */
  function attachGiftPageEvents() {
    if (!mainVideo) return;

    mainVideo.addEventListener("timeupdate", () => {
      updateSubtitleDisplay(mainVideo.currentTime);
    });

    mainVideo.addEventListener("seeked", () => {
      updateSubtitleDisplay(mainVideo.currentTime);
    });

    mainVideo.addEventListener("error", () => {
      if (missingVideoOverlay) missingVideoOverlay.classList.remove("hidden");
    });

    mainVideo.addEventListener("loadeddata", () => {
      if (missingVideoOverlay) missingVideoOverlay.classList.add("hidden");
      updateSubtitleDisplay(mainVideo.currentTime || 0);
    });

    function syncFullscreenTrackMode() {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (mainVideo.textTracks && mainVideo.textTracks[0]) {
        if (fsEl === mainVideo) {
          mainVideo.textTracks[0].mode = subtitleMode === "off" ? "disabled" : "showing";
        } else {
          mainVideo.textTracks[0].mode = "hidden";
        }
      }
    }

    document.addEventListener("fullscreenchange", syncFullscreenTrackMode);
    document.addEventListener("webkitfullscreenchange", syncFullscreenTrackMode);

    mainVideo.addEventListener("webkitbeginfullscreen", () => {
      if (mainVideo.textTracks && mainVideo.textTracks[0]) {
        mainVideo.textTracks[0].mode = subtitleMode === "off" ? "disabled" : "showing";
      }
    });

    mainVideo.addEventListener("webkitendfullscreen", () => {
      if (mainVideo.textTracks && mainVideo.textTracks[0]) {
        mainVideo.textTracks[0].mode = "hidden";
      }
    });

    mainVideo.addEventListener("ended", () => {
      launchConfetti();
      if (autoplayToggle && autoplayToggle.checked && currentIndex < videos.length - 1) {
        setTimeout(() => {
          selectVideo(currentIndex + 1, true, true);
        }, 1200);
      }
    });

    if (prevVideoBtn) {
      prevVideoBtn.addEventListener("click", () => {
        if (currentIndex > 0) selectVideo(currentIndex - 1, true, true);
      });
    }

    if (nextVideoBtn) {
      nextVideoBtn.addEventListener("click", () => {
        if (currentIndex < videos.length - 1) selectVideo(currentIndex + 1, true, true);
      });
    }

    subModeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        subtitleMode = btn.getAttribute("data-sub-mode");
        subModeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        attachNativeTrackFromCues(currentCues);
        updateSubtitleDisplay(mainVideo.currentTime || 0);
      });
    });

    if (subSizeBtn && playerWrapper) {
      subSizeBtn.addEventListener("click", () => {
        if (sizeClasses[subtitleSizeIndex]) {
          playerWrapper.classList.remove(sizeClasses[subtitleSizeIndex]);
        }
        subtitleSizeIndex = (subtitleSizeIndex + 1) % sizeClasses.length;
        if (sizeClasses[subtitleSizeIndex]) {
          playerWrapper.classList.add(sizeClasses[subtitleSizeIndex]);
        }
      });
    }

    if (demoSubtitlesBtn) {
      demoSubtitlesBtn.addEventListener("click", startDemoSubtitles);
    }
  }

  /**
   * 10. Lightweight Celebratory Confetti Engine
   */
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  let particles = [];
  let animFrameId = null;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function launchConfetti() {
    if (!ctx || !canvas) return;
    const colors = ["#f6d365", "#fda085", "#ff758c", "#ffffff", "#c471ed", "#12c2e9"];
    const count = 90;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width * (0.2 + Math.random() * 0.6),
        y: canvas.height * 0.35,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.28 + Math.random() * 0.12,
        opacity: 1
      });
    }

    if (!animFrameId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      if (p.y > canvas.height * 0.75) {
        p.opacity -= 0.025;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    particles = particles.filter((p) => p.opacity > 0 && p.y < canvas.height + 40);

    if (particles.length > 0) {
      animFrameId = requestAnimationFrame(animateConfetti);
    } else {
      animFrameId = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  if (celebrateBtn) {
    celebrateBtn.addEventListener("click", launchConfetti);
  }

  // Boot Application depending on active page (Home vs. Gift Video Page)
  initHeroText();

  if (videoGrid && !mainVideo) {
    // Home Page: Render Wrapped Presents Grid
    renderGiftsGrid();
    setTimeout(launchConfetti, 400);
  } else if (mainVideo && videos.length > 0) {
    // Dedicated Gift Video Page (gift.html)
    attachGiftPageEvents();
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id") || window.location.hash.replace("#", "");
    const foundIndex = videos.findIndex((v) => v.id === requestedId);
    selectVideo(foundIndex >= 0 ? foundIndex : 0, true, false);
    setTimeout(launchConfetti, 350);
  }
})();
