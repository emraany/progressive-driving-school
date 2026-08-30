/**
 * ============================================================================
 * SOMALI COPY  (Af-Soomaali)
 *
 * All visible Somali text. No prices, phone numbers, hour counts, or URLs
 * live here — those are facts, they live in ../site.ts, ../courses.ts and
 * ../bmv.ts, and both languages read the same copy of them.
 *
 * {placeholders} are filled at render time from those files. Available in BMV
 * and FAQ text: {classroomHours} {driveHours} {supervisedHours} {nightHours}
 * {affidavitFormNumber}
 *
 * TRANSLATION NOTE: official document and agency names are deliberately left
 * in English — TIPIC, BMV 5791, Class D, Driver Education Certificate, Ohio
 * BMV. A student has to find those exact words on a form and at the BMV
 * counter, so translating them would work against the reader. Where one first
 * appears, a Somali gloss is given alongside it.
 * ============================================================================
 */

import type { Copy } from "./types";

export const so = {
  a11y: {
    skipToContent: "U gudub qaybta ugu weyn",
    primaryNav: "Menu-ga ugu weyn",
    openMenu: "Fur menu-ga",
    closeMenu: "Xir menu-ga",
    callAria: "Wac Progressive Driving School",
    registerAria: "Isdiiwaangeli koorso",
    languageSwitcher: "Dooro luqad",
    opensInNewTab: "wuxuu ka furmayaa tab cusub",
  },

  nav: {
    home: "Bogga hore",
    courses: "Koorsooyinka",
    requirements: "Shuruudaha Ohio",
    contact: "Nala soo xiriir",
  },

  actions: {
    call: "Hadda wac",
    register: "Isdiiwaangeli",
    viewCourses: "Eeg koorsooyinka iyo qiimaha",
    viewRequirements: "Eeg shuruudaha Ohio",
    contactUs: "Nala soo xiriir",
    learnMore: "Wax dheeraad ah baro",
  },

  common: {
    callToConfirm: "Wac si aad u xaqiijiso",
    priceLabel: "Qiimaha",
    ageLabel: "Da'da ugu yar",
    classroomHoursLabel: "Fasalka",
    driveHoursLabel: "Wadista baabuurka",
    includesLabel: "Waxa ku jira",
    hoursUnit: "saacadood",
    classDBadge: "Waxay buuxisaa shuruudda Class D ee Ohio (da'da 18-20)",
    onlineBadge: "Fasalku waa onlayn",
  },

  home: {
    title: "Iskuulka Darawalnimada ee Columbus, Ohio",
    description:
      "Waxbarashada darawalnimada iyo tababarka wadista baabuurka ee Columbus iyo Franklin County. Fasal onlayn ah, diiwaangelin furan, iyo macallimiin la shaqeeya jadwalka dadka waaweyn.",
    hero: {
      eyebrow: "Columbus iyo Franklin County, Ohio",
      heading: "Shatigaaga darawalnimada ee Ohio, tallaabo tallaabo.",
      subheading:
        "Waxaan baraa darawallada cusub ee Columbus iyo Franklin County - oo ay ku jiraan dad waaweyn oo markii ugu horreysay shati qaadanaya. Shaqada fasalku waa onlayn oo aad iskaa u sameyso. Wadistuna waa macallin aad la jirto, jadwalkana waa laguu habeeyaa.",
      note: "Diiwaangelintu waa furan tahay. Bilow markaad diyaar tahay.",
    },
    coursesSection: {
      heading: "Koorsooyinka iyo qiimaha",
      intro:
        "Saddex koorso, qiime cad. Haddaadan hubin midka xaaladdaada ku habboon, na soo wac ka hor intaadan wax bixin.",
    },
    trust: {
      heading: "Sababta qoysaska iyo ardayda waaweyn noo doortaan",
      intro:
        "Waxbarasho toos ah, qiime cad, iyo iskuul taleefanka qaada.",
      // TODO(client): this section is where years in business, number of
      // students taught, instructor certifications, insurance/bonding and
      // testimonials belong once the client provides them. Every point below
      // is derived from what he has actually confirmed - nothing is invented.
      points: [
        {
          title: "Iskuul darawalnimo oo shati Ohio leh",
          body:
            "Ohio waxay ka rabtaa darawallada cusub ee da'doodu tahay 18 ilaa 20 inay koorsadooda Class D ka qaataan iskuul darawalnimo oo shati leh. Kayagu wuu tirsan yahay.",
        },
        {
          title: "Fasal jadwalkaaga ku habboon",
          body:
            "Qaybta fasalku gebi ahaanba waa onlayn. Guriga ka samee, fiidkii, ama maalin nasasho ah - markasta oo kuu habboon.",
        },
        {
          title: "Bilow markaad diyaar tahay",
          body:
            "Diiwaangelintu waa furan tahay. Toddobaadyo ma sugaysid inuu fasalka xiga furmo.",
        },
        {
          title: "Dadka waaweynna waa loo sameeyay",
          body:
            "Ardaydayada badankood waa dad waaweyn oo markii ugu horreysay shati qaadanaya. Ma noqon doontid qofka kaliya ee sidaas ah.",
        },
      ],
    },
    requirementsTeaser: {
      heading: "Shati qaadashada da'da 18 ilaa 20 ee Ohio",
      body:
        "Ohio waxay saddex shay kaa rabtaa: koorso waxbarashada darawalnimada, {supervisedHours} saacadood oo tababar la kormeeray oo la diiwaangeliyay, iyo inaad ka gudubto imtixaanka wadista iyo xirfadaha. Saddexdaba si fudud ayaan u qornay, oo ay la socdaan foomamka iyo linkiyada rasmiga ah ee aad u baahan doonto.",
    },
    serviceArea: {
      heading: "Halka aan wax ka baranno",
      body: "Waxaan adeegnaa Columbus iyo Franklin County, Ohio.",
      pickupNote:
        "Waxaa jira soo qaadis arday oo xaddidan, iyadoo ku xiran helitaanka macallinka - na weydii markaad ballan qabsanayso.",
    },
    finalCta: {
      heading: "Ma diyaar u tahay inaad bilowdo?",
      body:
        "Na soo wac saacadaha shaqada, ama fariin noo dir oo waan kuu soo laaban doonnaa. Su'aaluhu waa bilaash - weydii ka hor intaadan isdiiwaangelin.",
    },
  },

  coursesPage: {
    title: "Koorsooyinka iyo Qiimaha",
    description:
      "Koorsooyinka waxbarashada darawalnimada ee Columbus, Ohio. Koorso onlayn ah oo 24 saacadood ah oo ay weheliso 8 saacadood oo wadis ah, 8 saacadood oo wadis keliya ah, iyo koorso 12 saacadood ah oo loogu talagalay dadka 21 jir iyo ka weyn.",
    heading: "Koorsooyinka iyo qiimaha",
    intro:
      "Qiimaha aad aragto waa qiimaha koorsada. Haddaadan hubin midka aad u baahan tahay, na soo wac - waxaan doorbidaynaa inaan koorsada saxda ah kugu tilmaanno intaan mid khaldan kaa iibinno.",
    enrollment: {
      heading: "Sida diiwaangelintu u shaqeyso",
      body:
        "Diiwaangelintu waa furan tahay, sidaas darteed waad bilaabi kartaa markaad diyaar tahay, halkii aad sugi lahayd inuu fasal cusub bilaabmo. Qaybta fasalka waxaad ku dhammaystirtaa onlayn si aad iskaa u sameyso. Saacadaha wadistana macallin ayaad la ballamaysaa.",
    },
    help: {
      heading: "Ma hubtid koorsada aad u baahan tahay?",
      body:
        "Xaaladdaada - da'daada, inaad meel kale saacado fasal ka qaadatay iyo waxa BMV-du kaa rabto - ayaa go'aaminaysa koorsada kuu habboon. Na soo wac oo waan kula shaqeyn doonnaa.",
    },
  },

  requirementsPage: {
    title: "Shuruudaha Shatiga Ohio, Da'da 18-20",
    description:
      "Waxa Ohio kaa rabto si aad shati u hesho markaad tahay 18 ilaa 20: koorso waxbarashada darawalnimada Class D, 50 saacadood oo tababar la kormeeray oo la diiwaangeliyay, iyo imtixaanka wadista iyo xirfadaha.",
    heading: "Sida aad shatiga Ohio u heli lahayd da'da 18 ilaa 20",
    intro:
      "Tanu waa su'aasha ugu badan ee nalaga weydiiyo. Halkan waa jidka oo dhan, si fudud loo qoray, oo ay la socdaan foomamka iyo linkiyada rasmiga ah ee Ohio BMV ee aad u baahan doonto.",
    audienceNote:
      "Shuruudahani waxay khuseeyaan darawallada cusub ee da'doodu tahay 18 ilaa 20 ee codsanaya shatiga Class D ee Ohio.",
    adultNote:
      "Ma tahay 21 jir ama ka weyn? Tallaabooyinka hoose waxay khuseeyaan darawallada 18 ilaa 20. Na soo wac oo waan kuu sheegi doonnaa waxa xaaladdaada khuseeya.",
    stepLabel: "Tallaabada {n}",
    officialLinksHeading: "Linkiyada rasmiga ah ee Ohio BMV",
    linkLabels: {
      schoolLookup: "Raadi iskuulada darawalnimada ee shatiga Ohio leh",
      fiftyHourAffidavit:
        "Soo deji warqadda dhaarta ee konton saacadood (foomka {affidavitFormNumber})",
      scheduleTest: "Ballan u qabso imtixaanka wadista ee Ohio BMV",
      gdlInfo: "Macluumaadka shatiga Ohio ee darawallada cusub",
    },
    certificateNote:
      "Haddii BMV-du awoodi weydo inay si elektaroonig ah u xaqiijiso dhammaystirkaaga koorsada, waxaa laga yaabaa in imtixaanka wadista ama xirfadaha lagaa weydiiyo Driver Education Certificate-kaaga (shahaadada waxbarashada darawalnimada). Nuqul la soco.",
    testDay: {
      heading: "Waxa aad imtixaanka u qaadan doonto",
      intro:
        "Kuwan oo dhan keen imtixaanka wadista iyo xirfadaha. Inaad mid la'aan timaaddo waxay kaa lumin kartaa ballanta.",
      items: {
        tipic:
          "TIPIC-kaaga (kaadhka aqoonsiga ee ruqsadda barashada ku meel gaarka ah)",
        vehicle:
          "Gaari xaalad wanaagsan ku jira, oo leh taargadiisa, nooca iyo moodelkiisa",
        affidavit:
          "Warqaddaada dhaarta ee konton saacadood ee {affidavitFormNumber} oo la buuxiyay",
        certificate: "Nuqul ka mid ah Driver Education Certificate-kaaga",
      },
    },
    disclaimer:
      "Kuwani waa shuruudaha Ohio BMV, oo halkan lagu soo koobay si ay kaaga caawiyaan qorshaynta. Progressive Driving School waa iskuul darawalnimo oo gaar ah - ma nihin Ohio BMV, shatiyana ma bixinno. Had iyo jeer BMV-da ka xaqiiji shuruudaha hadda jira ka hor ballantaada.",
    lastVerifiedLabel: "Shuruudaha Ohio markii ugu dambeysay waxaa la hubiyay {date}.",
  },

  contactPage: {
    title: "Nala Soo Xiriir",
    description:
      "Wac, iimayl noo dir, ama fariin u dir Progressive Driving School ee Columbus, Ohio. Su'aalahaaga waan kaaga jawaabi doonnaa ka hor intaadan isdiiwaangelin.",
    heading: "Nala soo xiriir",
    intro:
      "Na soo wac saacadaha shaqada haddii aad jawaab dhaqso ah rabto, ama fariin noo dir oo waan kuu soo laaban doonnaa.",
    infoHeading: "Faahfaahinta xiriirka",
    phoneHeading: "Taleefan",
    emailHeading: "Iimayl",
    addressHeading: "Cinwaanka",
    hoursHeading: "Saacadaha",
    serviceAreaHeading: "Aagga adeegga",
    pickupNote:
      "Waxaa jira soo qaadis arday oo xaddidan, iyadoo ku xiran helitaanka macallinka.",
    directionsLink: "Hel tilmaamaha jidka",
  },

  courses: {
    online24plus8: {
      name: "Koorso Onlayn ah oo 24 Saacadood ah + 8 Saacadood oo Wadis ah",
      shortName: "Koorso 24 Saacadood + 8 Saacadood Wadis",
      tagline: "Koorsada dhammaystiran ee waxbarashada darawalnimada Class D ee Ohio.",
      audience:
        "Loogu talagalay darawallada cusub ee da'doodu tahay 18 ilaa 20 ee markii ugu horreysay shati Ohio qaadanaya.",
      includes: [
        "{classroomHours} saacadood oo waxbarasho fasal ah, oo onlayn lagu dhammaystiro si aad iskaa u sameyso",
        "{driveHours} saacadood oo wadis ah oo macallin kula jiro",
        "Waxay buuxisaa shuruudda waxbarashada darawalnimada Class D ee Ohio ee da'da 18 ilaa 20",
        "Driver Education Certificate markaad dhammaysato",
      ],
    },
    drive8: {
      name: "8 Saacadood oo Wadis ah oo Keliya",
      shortName: "8 Saacadood Wadis",
      tagline: "Tababarka wadista baabuurka oo keligiis ah.",
      audience:
        "Loogu talagalay darawallada u baahan saacadaha wadista oo keliya. Na soo wac si aad u xaqiijiso inay tanu koorsada saxda ah u tahay xaaladdaada.",
      includes: [
        "{driveHours} saacadood oo wadis ah oo macallin kula jiro",
        "Waxaa loo qorsheeyaa waqtiga aad heli karto",
        "Waxaan adeegnaa Columbus iyo Franklin County",
      ],
    },
    adult12: {
      name: "Wadis 12 Saacadood ah oo Dadka Waaweyn (21 jir iyo ka weyn)",
      shortName: "Wadis 12 Saacadood, Dadka Waaweyn",
      tagline: "Tababar wadis oo dheeraad ah oo loogu talagalay ardayda waaweyn.",
      audience: "Loogu talagalay darawallada da'doodu tahay 21 iyo ka weyn.",
      includes: [
        "{driveHours} saacadood oo wadis ah oo macallin kula jiro",
        "Waqti dheeraad ah oo shukaanka gadaashiisa ah oo loogu talagalay kuwa bilowga ka bilaabaya",
        "Waxaa loo qorsheeyaa shaqada iyo mas'uuliyadaha qoyska",
      ],
    },
  },

  bmv: {
    steps: {
      education: {
        title: "Dhammayso koorso waxbarashada darawalnimada",
        body:
          "Ohio waxay kaa rabtaa inaad koorso waxbarashada darawalnimada Class D ku dhammaysato iskuul darawalnimo oo shati leh. Taasi waxay ka dhigan tahay {classroomHours} saacadood oo fasal ama waxbarasho onlayn ah, iyo weliba {driveHours} saacadood oo wadis ah oo macallin kula jiro. Xirmadayada koorsada onlayn iyo 8-da saacadood ee wadistu labadaba way daboolaysaa.",
      },
      practice: {
        title: "Diiwaangeli {supervisedHours} saacadood oo tababar la kormeeray",
        body:
          "Koorsadaada dhinaceeda, waxaad u baahan tahay inaad dhammaysato oo aad diiwaangeliso {supervisedHours} saacadood oo tababar wadis ah oo aad la sameyneyso qof weyn oo u qalma. Ugu yaraan {nightHours} saacadood oo saacadahaas ka mid ah waa inay habeenkii ahaadaan. Sida aad u socoto ku qor foomka {affidavitFormNumber} ee warqadda dhaarta ee konton saacadood, imtixaankaagana la imow.",
      },
      test: {
        title: "Ka gudub imtixaanka wadista iyo xirfadaha",
        body:
          "Marka koorsadaada iyo saacadaha tababarkaagu dhammaadaan, ballan u qabso imtixaanka wadista iyo xirfadaha ee Ohio BMV. Liiska hoose eeg ka hor intaadan tegin - inaad mid la'aan timaaddo waxay kaa lumin kartaa ballanta.",
      },
    },
  },

  faq: {
    heading: "Su'aalaha badanaa la weydiiyo",
    intro: "Waxyaabaha dadku ugu badan na weydiiyaan.",
    items: {
      whoNeedsDriverEd: {
        q: "Yaa u baahan inuu koorso waxbarashada darawalnimada ka qaato Ohio?",
        a: "Haddii aad u dhaxayso 18 ilaa 20 oo aad codsanayso shatigaaga Ohio ee ugu horreeya, waxaad u baahan tahay inaad dhammaysato koorso waxbarashada darawalnimada Class D - {classroomHours} saacadood oo fasal ama waxbarasho onlayn ah oo ay weheliso {driveHours} saacadood oo wadis ah. Xirmadayada koorsada onlayn iyo 8-da saacadood ee wadistu taa si sax ah ayay u daboolaysaa.",
      },
      classroomOnline: {
        q: "Qaybta fasalku ma onlayn baa?",
        a: "Haa. Dhammaan {classroomHours} saacadood ee fasalku waa onlayn oo aad iskaa u sameyso. Kaliya saacadaha wadistaada ayaa si toos ah u dhacaya.",
      },
      whenCanIStart: {
        q: "Goorma ayaan bilaabi karaa?",
        a: "Markasta oo aad diyaar tahay. Diiwaangelintu waa furan tahay, sidaas darteed ma sugaysid inuu fasalka xiga furmo. Na soo wac ama fariin noo dir oo waan ku diyaarin doonnaa.",
      },
      howLongToFinish: {
        q: "Intee in le'eg ayay qaadanaysaa in la dhammaystiro?",
        a: "Way ku xiran tahay sida aad u dhaqso badan uga gudubto saacadaha fasalka onlayn iyo sida aan u awoodno inaan u qorsheyno wadistaada. Na soo wac oo waxaan ku siin doonnaa waqti dhab ah oo xaaladdaada ku habboon.",
      },
      doYouProvideCar: {
        // TODO(client): confirm whether the school provides the vehicle for
        // behind-the-wheel hours, and what else the price includes. Answered
        // honestly rather than guessed.
        q: "Ma bixisaan gaari saacadaha wadista?",
        a: "Na soo wac oo waan kuu sharxi doonnaa waxa saacadaha wadistaada ku jira iyo waxa, haddii ay jiraan, aad keeni u baahan tahay.",
      },
      pickup: {
        q: "Ardayda ma soo qaaddaan?",
        a: "Waxaan bixinnaa soo qaadis xaddidan iyadoo ku xiran helitaanka macallinka. Na weydii markaad ballan qabsanayso oo waan kuu sheegi doonnaa waxa aan awoodno.",
      },
      adultLearners: {
        q: "Waxaan ka weynahay 21 oo markii ugu horreysay ayaan wadista baranayaa. Ma i caawin kartaan?",
        a: "Haa. Koorsadayada 12-ka saacadood ee dadka waaweyn waxaa loo sameeyay darawallada 21 jir iyo ka weyn. Na soo wac oo waan kula soo qaadi doonnaa waxa Ohio kaa rabto iyo inta saacadood ee macquulka ah.",
      },
      somaliSupport: {
        // TODO(client): confirm that instruction and phone support really are
        // available in Somali before this answer is made more specific. A
        // bilingual site implies Somali-speaking service - don't over-promise.
        q: "Ma bixisaan caawimaad Af-Soomaali ah?",
        a: "Na soo wac oo noo sheeg luqadda aad doorbidayso, waanan isku dayi doonnaa inaan ku caawinno.",
      },
      whatToBring: {
        // TODO(client): "what to bring" was never fully answered. In
        // particular: does a student need a TIPIC in hand before their FIRST
        // behind-the-wheel lesson? The BMV source material mentions the TIPIC
        // only in connection with test day.
        q: "Maxaan u baahanahay inaan keeno casharkayga wadista ee ugu horreeya?",
        a: "Waxaan kuu sheegi doonnaa si sax ah waxa aad keeni doonto marka aan qorsheyneyno casharkaaga ugu horreeya. Haddaadan hubin inaad haysato wax kasta oo aad u baahan tahay, marka hore na soo wac.",
      },
      howToRegister: {
        q: "Sidee ayaan isu diiwaangelinayaa?",
        a: "Isticmaal badhanka Isdiiwaangelinta ee ku yaal bogga kasta dushiisa, ama na soo wac saacadaha shaqada. Waan ku faraxsan nahay inaan su'aalahaaga ka jawaabno ka hor intaadan wax ballan qaadin.",
      },
    },
  },

  form: {
    heading: "Fariin noo dir",
    intro:
      "Wax yar noo sheeg waxa aad u baahan tahay oo waan kuu soo laaban doonnaa. Haddii aad doorbidayso inaad hadda qof la hadasho, na soo wac.",
    nameLabel: "Magacaaga",
    namePlaceholder: "Magaca hore iyo kan dambe",
    phoneLabel: "Lambarka taleefanka",
    phonePlaceholder: "614-555-0100",
    emailLabel: "Cinwaanka iimaylka",
    emailPlaceholder: "adiga@tusaale.com",
    languageLabel: "Luqadda aad doorbidayso",
    // Keep paired labels short: this one sits beside "Luqadda aad doorbidayso"
    // in a two-column row, and a label that wraps misaligns the two selects.
    courseLabel: "Koorsada xiisaha leh",
    coursePlaceholder: "Dooro koorso",
    courseOther: "Weli ma hubo / wax kale",
    messageLabel: "Fariintaada",
    messagePlaceholder:
      "Noo sheeg da'daada, inaad hore u qaadatay saacado fasal iyo goorta aad jeclaan lahayd inaad bilowdo.",
    optionalSuffix: "(ikhtiyaari)",
    submit: "Dir fariinta",
    submitting: "Waa la dirayaa...",
    successHeading: "Mahadsanid - fariintaadu way socotaa.",
    successBody:
      "Waan kuu soo laaban doonnaa sida ugu dhaqsaha badan. Haddii ay degdeg tahay, na soo wac.",
    errorHeading: "Fariintii ma dirmin.",
    errorBody:
      "Wax baa dhinacayaga ka qaldamay. Fadlan naga soo wac {phone} oo waan kuu xallin doonnaa.",
    privacyNote:
      "Faahfaahintaada waxaan u isticmaalnaa oo keliya inaan kaaga jawaabno. Ma iibinno mana la wadaagno cid kale.",
    errors: {
      nameRequired: "Fadlan noo sheeg magacaaga.",
      contactRequired: "Fadlan na sii lambar taleefan ama cinwaan iimayl ah.",
      emailInvalid: "Cinwaankaas iimaylku sax uma muuqdo.",
      messageRequired: "Fadlan noo sheeg sida aan kuu caawin karno.",
    },
  },

  footer: {
    tagline:
      "Waxbarashada darawalnimada iyo tababarka wadista baabuurka ee Columbus iyo Franklin County, Ohio.",
    navHeading: "Bogagga",
    contactHeading: "Xiriirka",
    hoursHeading: "Saacadaha",
    serviceAreaHeading: "Aagga adeegga",
    officialLinksHeading: "Linkiyada Ohio BMV",
    rights: "© {year} {name}. Xuquuqda oo dhan waa la dhawray.",
    disclaimer:
      "Progressive Driving School waa iskuul darawalnimo oo gaar ah, kamana tirsana Ohio Bureau of Motor Vehicles (Xafiiska Baabuurta ee Ohio).",
  },

  media: {
    heroPrimary:
      "Macallin iyo arday Progressive Driving School ah oo ag taagan gaari tababar",
    coursesBanner: "Gaari tababar oo Progressive Driving School leedahay",
    trustPortrait: "Macallin wadis oo Progressive Driving School ah",
    requirementsBanner: "Arday darawal ah oo shukaanka haya inta cashar socdo",
    contactExterior: "Albaabka xafiiska Progressive Driving School",
  },
} satisfies Copy;

export default so;
