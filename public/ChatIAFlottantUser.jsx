<div className="absolute bottom-28 right-3 flex items-center space-x-2" aria-label="Assistant IA et langue">
  {/* Image avatar avec animation conditionnelle */}
  <img
    src="/images/avatar-gael.jpg"
    alt="Assistant IA Gaël"
    className={`w-14 h-14 rounded-full border-2 border-blue-600 shadow-lg transition-transform duration-300 ${
      enCours || vocal ? 'animate-bounce' : ''
    }`}
  />

  {/* Drapeau/emoji selon langue */}
  <span
    className="text-2xl"
    role="img"
    aria-label={
      {
        fr: "Drapeau français",
        en: "Drapeau britannique",
        ar: "Drapeau saoudien",
        sw: "Globe terrestre",
        kg: "Drapeau congolais",
        ln: "Drapeau congolais",
        pt: "Drapeau portugais",
        es: "Drapeau espagnol",
        it: "Drapeau italien",
        tsh: "Globe terrestre"
      }[langue] || "Globe terrestre"
    }
  >
    {{
      fr: "🇫🇷",
      en: "🇬🇧",
      ar: "🇸🇦",
      sw: "🌍",
      kg: "🇨🇩",
      ln: "🇨🇩",
      pt: "🇵🇹",
      es: "🇪🇸",
      it: "🇮🇹",
      tsh: "🌐"
    }[langue] || "🌐"}
  </span>
</div>
