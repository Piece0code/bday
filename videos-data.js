/**
 * ============================================================================
 * 🎂 CONFIGURATION DU SITE D'ANNIVERSAIRE / BIRTHDAY SITE CONFIGURATION
 * ============================================================================
 * Modifiez facilement le nom, le message et la liste de vos vidéos ci-dessous.
 */

window.BIRTHDAY_CONFIG = {
  // Nom ou surnom affiché en grand dans le titre / Recipient's name
  recipientName: "Maman • Tía • Hermana",

  // Badge festif en haut de page
  badgeText: "✨ Joyeux Anniversaire • ¡Feliz Cumpleaños desde Chile a Francia! ✨",

  // Titre principal / Main headline
  heroTitleFr: "Joyeux Anniversaire",
  heroTitleEs: "¡Feliz Cumpleaños!",

  // Message d'accueil bilingue / Bilingual welcome note
  welcomeMessageFr:
    "Du Chili jusqu'en France, toute ta famille et tes proches se sont réunis pour t'envoyer ces messages remplis d'amour. Toutes les vidéos sont en espagnol avec leurs sous-titres en français.",
  welcomeMessageEs:
    "Desde Chile hasta Francia, toda tu familia y seres queridos se han reunido para enviarte estos mensajes llenos de amor. Todos los vídeos incluyen subtítulos en francés.",

  // Signature de la carte / Card signature
  signature: "Avec tout notre amour ❤️ • Con todo nuestro amor ❤️",

  /**
   * LISTE DES 9 VIDÉOS D'ANNIVERSAIRE
   */
  videos: [
    {
      id: "frere-ramon",
      title: "Ramon",
      speaker: "De : Ramon",
      description: "Un message chaleureux de ton frère Ramon pour te souhaiter un très bel anniversaire.",
      src: "videos/Frère ramon.mp4",
      subtitleFr: "subtitles/Frère ramon.fr.vtt",
      poster: "",
      cues: [
        {
          start: 0.0,
          end: 11.0,
          fr: "Bonjour ma sœur, joyeux anniversaire ! Passe une très belle journée, je te souhaite plein de bonheur, que tout aille bien, et grand bonjour à tout le monde là-bas aussi !",
          es: "¡Hola, feliz cumpleaños hermana! Que la pases muy bien, te deseo muchas felicidades y que esté todo bien, y muchos saludos por allá también a todos."
        }
      ]
    },
    {
      id: "louisa",
      title: "Luisa",
      speaker: "De : Luisa",
      description: "Plein de bénédictions, d'amour et l'espoir de se retrouver très bientôt.",
      src: "videos/Louisa.mp4",
      subtitleFr: "subtitles/Louisa.fr.vtt",
      poster: "",
      cues: [
        {
          start: 0.0,
          end: 4.0,
          fr: "Coucou sœur chérie, je voulais te souhaiter un très joyeux anniversaire !",
          es: "Hola hermanita, quería desearte un feliz cumpleaños,"
        },
        {
          start: 4.0,
          end: 8.0,
          fr: "J'espère que tu passes un super moment entourée de tous ceux qui te sont chers,",
          es: "espero que la pases súper bien junto a todos nuestros seres queridos"
        },
        {
          start: 8.0,
          end: 13.0,
          fr: "et que tu en fêtes encore beaucoup d'autres ! Je te souhaite le meilleur, plein de bénédictions.",
          es: "y que cumplas muchos más, te deseo lo mejor, muchas bendiciones,"
        },
        {
          start: 13.0,
          end: 17.0,
          fr: "Je t'aime très fort et j'ai tellement hâte de te revoir,",
          es: "te quiero mucho y no hallo la hora de volverte a ver,"
        },
        {
          start: 17.0,
          end: 20.0,
          fr: "et je sais que ce sera possible un jour !",
          es: "pero sé que se va a poder dar en algún momento."
        },
        {
          start: 20.0,
          end: 23.0,
          fr: "Alors encore un très joyeux anniversaire sœur chérie,",
          es: "Así que por eso hermanita, muchas felicidades,"
        },
        {
          start: 23.0,
          end: 26.0,
          fr: "un énorme câlin et un gros bisou !",
          es: "un abrazo fuerte y un gran beso."
        },
        {
          start: 26.0,
          end: 28.0,
          fr: "Je t'aime, bisous !",
          es: "Te quiero, chao."
        }
      ]
    },
    {
      id: "janina",
      title: "Yanina & son mari",
      speaker: "De : Yanina & son mari",
      description: "Visite guidée du petit coin de campagne à Chiloé où toute la famille t'attend à bras ouverts !",
      src: "videos/Janina.mp4",
      subtitleFr: "subtitles/Janina.fr.vtt",
      poster: "",
      cues: [
        {
          start: 0.0,
          end: 10.0,
          fr: "Joyeux anniversaire depuis Chiloé ! On t'aime ! Je t'aime très fort, tu me manques. Ce petit coin de campagne vous attend tous !",
          es: "¡Feliz cumpleaños! ¡Desde acá de Chiloé! Te amamos. Te amo mucho, te extraño. Este campito te está esperando a todos."
        },
        {
          start: 10.0,
          end: 13.0,
          fr: "Joyeux anniversaire, sœur chérie ! Je t'aime.",
          es: "¡Feliz cumpleaños, hermanita! Te amo."
        },
        {
          start: 13.0,
          end: 19.0,
          fr: "Salut belle-sœur ! J'espère que tu profites bien de la famille.",
          es: "¡Hola cuñada! Espero que la estés disfrutando con la familia."
        },
        {
          start: 20.0,
          end: 28.0,
          fr: "Tu sais qu'ici on t'aime énormément et que l'invitation est toujours ouverte !",
          es: "Usted sabe que por acá la queremos mucho y se extiende la invitación."
        },
        {
          start: 28.0,
          end: 34.0,
          fr: "Tiens, pour que tu voies un petit peu : là-bas on voit les poules, les cochons...",
          es: "Ahí, para que conozca un poquito, por allá se ven las gallinas, los chanchos."
        },
        {
          start: 34.0,
          end: 37.0,
          fr: "Et par là-bas, il y a la maison.",
          es: "Ahí, para allá está la casa."
        },
        {
          start: 37.0,
          end: 42.72,
          fr: "Et juste en face, il y a un petit bois.",
          es: "Y allá al frente hay un bosquecito."
        },
        {
          start: 42.72,
          end: 53.97,
          fr: "Donc voilà, nous vivons ici sur l'île de Chiloé, et si tu veux venir avec les belles-sœurs... ou plutôt les nièces ?",
          es: "Así que nosotros estamos viviendo acá en la isla de Chiloé y si quiere llegar con las cuñadas... ¿o qué vendrían siendo, sobrinas?"
        },
        {
          start: 53.97,
          end: 54.97,
          fr: "Ma nièce !",
          es: "Mi sobrina."
        },
        {
          start: 54.97,
          end: 55.97,
          fr: "Les nièces ?",
          es: "¿Las sobrinas?"
        },
        {
          start: 55.97,
          end: 61.97,
          fr: "La nièce, les enfants, les petits-enfants, les arrière-petits-enfants, toute la famille, sœur chérie !",
          es: "La sobrina, los hijos, los nietos, los bisnietos, toda la familia, hermanita."
        },
        {
          start: 61.97,
          end: 62.97,
          fr: "Tout le monde est le bienvenu !",
          es: "Todos son bien recibidos."
        },
        {
          start: 62.97,
          end: 66.97,
          fr: "Passez tous un super moment, profitez bien de votre maman !",
          es: "Que la pasen súper bien todos, disfruten a la madre."
        },
        {
          start: 66.97,
          end: 69.97,
          fr: "Bisous, ciao ciao !",
          es: "Chau chau."
        },
        {
          start: 69.97,
          end: 74.97,
          fr: "Au revoir sœur chérie, gros bisous, prenez soin de vous et plein d'amour à tous !",
          es: "Chau hermanita, besito, cuídense, cariño para todos."
        }
      ]
    },
    {
      id: "judith",
      title: "Judith & ses enfants",
      speaker: "De : Judith & ses enfants",
      description: "Chanson d'anniversaire en chœur et vœux chaleureux envoyés depuis le Chili ! 🎂🎶",
      src: "videos/Judith.mp4",
      subtitleFr: "subtitles/Judith.fr.vtt",
      poster: "",
      cues: [
        {
          start: 0.14,
          end: 20.38,
          fr: "🎵 Joyeux anniversaire, nous te souhaitons ! Joyeux anniversaire à toi, joyeux anniversaire ! 🎵",
          es: "🎵 Cumpleaños feliz, te deseamos a ti, que los cumplas feliz. 🎵"
        },
        {
          start: 20.38,
          end: 30.88,
          fr: "Joyeux anniversaire ! Que cette nouvelle année soit encore plus belle, que tous tes vœux se réalisent et que tu puisses venir nous rendre visite bientôt !",
          es: "Felicidades, que este sea un mejor año también, que siga cumpliendo muchos más, se cumplan todos sus deseos y pueda venir a visitarnos pronto."
        },
        {
          start: 30.88,
          end: 37.88,
          fr: "En espérant te voir avec d'autres membres de la famille, et qu'un jour nous puissions nous aussi venir vous rendre visite à tous !",
          es: "Ojalá con más personas de la familia, y algún día también quizás poder nosotros ir a visitarlos a todos ustedes."
        },
        {
          start: 37.88,
          end: 41.88,
          fr: "Un immense câlin et plein d'amour à vous tous, depuis le Chili !",
          es: "Un abrazo y cariño para todos, todos, todos. Desde Chile."
        },
        {
          start: 41.88,
          end: 43.88,
          fr: "Bisous !",
          es: "¡Chau!"
        },
        {
          start: 43.88,
          end: 45.88,
          fr: "On vous embrasse tous bien fort !",
          es: "Un abrazo para todos."
        }
      ]
    },
    {
      id: "jessica",
      title: "Message de Jessica • Mensaje de Jessica",
      speaker: "De : Jessica",
      description: "De doux vœux d'anniversaire pour une magnifique journée entourée des tiens.",
      src: "videos/Jessica.mp4",
      subtitleFr: "subtitles/Jessica.fr.vtt",
      poster: "",
      cues: [
        {
          start: 0.0,
          end: 5.0,
          fr: "Joyeux anniversaire ! Passe une très belle journée entourée de ta famille.",
          es: "Feliz cumpleaños, que tengas un bonito día junto a la familia."
        },
        {
          start: 5.0,
          end: 8.0,
          fr: "Je te souhaite le meilleur et encore beaucoup d'autres anniversaires à fêter !",
          es: "Te deseo lo mejor, que cumplas muchos más."
        },
        {
          start: 8.0,
          end: 12.0,
          fr: "J'espère te revoir très bientôt, et je sais que ça arrivera !",
          es: "Te deseo ver pronto y sé que va a pasar."
        },
        {
          start: 12.0,
          end: 16.0,
          fr: "Joyeux anniversaire, bisous sœur chérie et fêtez ça bien !",
          es: "Feliz cumpleaños, chao hermanita y que la pasen bonito."
        },
        {
          start: 16.0,
          end: 17.0,
          fr: "Santé et bonjour à tous !",
          es: "Saludos a todos."
        }
      ]
    },
    {
      id: "isabelle-niece",
      title: "Isabel",
      speaker: "De : Isabel",
      description: "Un message plein de tendresse de ta nièce Isabel qui pense très fort à toi.",
      src: "videos/Isabelle niece.mp4",
      subtitleFr: "subtitles/Isabelle niece.fr.vtt",
      poster: "",
      cues: [
        {
          start: 1.1,
          end: 8.9,
          fr: "Coucou Tatie ! Je te souhaite un très joyeux anniversaire, passe un super moment entourée de tous",
          es: "Hola tía, le deseo un feliz cumpleaños, que la pase muy, muy, muy bien junto a todos"
        },
        {
          start: 8.9,
          end: 17.02,
          fr: "ceux que tu aimes. Je te souhaite d'en fêter encore beaucoup d'autres, je t'aime très fort et tu nous manques beaucoup !",
          es: "sus seres queridos y le deseo que cumpla muchos más, la quiero mucho y se le extraña."
        },
        {
          start: 17.02,
          end: 21.18,
          fr: "Gros bisous Tatie, joyeux anniversaire !",
          es: "Un besito igual, chao tía, feliz cumpleaños."
        }
      ]
    },
    {
      id: "miguel-et-sa-fille",
      title: "Miguel et sa fille • Miguel y su hija",
      speaker: "De : Miguel & sa fille",
      description: "Les vœux d'anniversaire de Miguel et de sa fille, avec un grand bonjour aux cousins !",
      src: "videos/Miguel-et-sa-fille.mp4",
      subtitleFr: "subtitles/Miguel-et-sa-fille.fr.vtt",
      poster: "",
      cues: [
        {
          start: 0.0,
          end: 8.0,
          fr: "Coucou Tatie, joyeux anniversaire ! Passe une très belle journée, qu'il y en ait encore beaucoup d'autres et j'espère te voir bientôt !",
          es: "Hola tía, feliz cumpleaños, que la pase bien, que cumpla muchos más y ojalá verla pronto."
        },
        {
          start: 8.0,
          end: 12.0,
          fr: "Coucou Tatie, joyeux anniversaire, j'espère te voir bientôt !",
          es: "Hola tía, feliz cumpleaños, espero verla pronto."
        },
        {
          start: 12.0,
          end: 15.5,
          fr: "Gros bisous à tout le monde, à mes cousins, à tous !",
          es: "Saludos a todos, a mis primos, a todos."
        },
        {
          start: 31.0,
          end: 34.0,
          fr: "Tu es superbe et ça me fait tellement plaisir de te voir !",
          es: "Que se ve muy bien y que me encanta verla."
        },
        {
          start: 36.0,
          end: 38.5,
          fr: "Et bonjour à tous !",
          es: "Y a todos."
        }
      ]
    },
    {
      id: "neveux",
      title: "Message de ton neveu • Mensaje de tu sobrino",
      speaker: "De : Ton neveu",
      description: "Un doux message envoyé jusqu'en France pour te souhaiter un merveilleux anniversaire.",
      src: "videos/Neveux.mp4",
      subtitleFr: "subtitles/Neveux.fr.vtt",
      poster: "",
      cues: [
        {
          start: 0.0,
          end: 5.0,
          fr: "Coucou Tatie ! J'espère que cet anniversaire sera spécial auprès de ta famille là-bas en France,",
          es: "Hola tía, espero que este cumpleaños sea diferente con su familia allá en Francia"
        },
        {
          start: 5.0,
          end: 11.0,
          fr: "et que tu en fêtes encore beaucoup d'autres ! Je t'aime très fort et tu me manques énormément. Prends soin de toi, un gros bisou !",
          es: "y espero que cumpla muchos más. La quiero mucho y la extraño demasiado. Cuídate, un beso."
        }
      ]
    },
    {
      id: "sylvia-copine",
      title: "Silvia",
      speaker: "De : Silvia",
      description: "Un message émouvant de ta « sœur de cœur » et fidèle amie Silvia.",
      src: "videos/Sylvia-copine.mp4",
      subtitleFr: "subtitles/Sylvia-copine.fr.vtt",
      poster: "",
      cues: [
        {
          start: 0.0,
          end: 6.0,
          fr: "Coucou ma chère amie ! J'espère que tu vas bien auprès de ta famille, de tes enfants et de tes petits-enfants.",
          es: "Hola, querida amiga, espero que te encuentres bien junto a tu familia, tus hijos, tus nietos."
        },
        {
          start: 6.0,
          end: 12.0,
          fr: "Je tenais à t'envoyer ce message pour ton anniversaire : je te souhaite le meilleur dans la vie, tu le mérites tellement !",
          es: "Te quiero saludar por tu cumpleaños, te deseo lo mejor, lo mejor de la vida, te lo mereces."
        },
        {
          start: 12.0,
          end: 20.0,
          fr: "Tu es ma sœur de cœur, la sœur que je n'ai jamais eue, et je pense toujours à toi avec énormément de tendresse.",
          es: "Eres mi hermana de la vida, la hermana que nunca tuve y siempre te recuerdo con mucho cariño."
        },
        {
          start: 20.0,
          end: 28.0,
          fr: "Je suis toujours ta « Lionne », tu verras que j'ai toujours les cheveux aussi volumineux !",
          es: "Sigo siendo tu «Leona», te darás cuenta que tengo el pelo igual de voluminoso."
        },
        {
          start: 28.0,
          end: 34.0,
          fr: "Et que te dire de plus, si ce n'est que je te souhaite de passer une merveilleuse journée d'anniversaire !",
          es: "Y bueno, qué más decirte, que quiero que lo pases muy bien el día de tu cumpleaños."
        },
        {
          start: 34.0,
          end: 37.0,
          fr: "Je t'aime très fort !",
          es: "Te quiero mucho."
        }
      ]
    }
  ]
};
