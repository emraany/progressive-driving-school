/**
 * ============================================================================
 * ENGLISH COPY
 *
 * All visible English text. No prices, phone numbers, hour counts, or URLs
 * live here — those are facts, they live in ../site.ts, ../courses.ts and
 * ../bmv.ts, and both languages read the same copy of them.
 *
 * {placeholders} are filled at render time from those files. Available in BMV
 * and FAQ text: {classroomHours} {driveHours} {supervisedHours} {nightHours}
 * {affidavitFormNumber}
 * ============================================================================
 */

import type { Copy } from "./types";

export const en = {
  a11y: {
    skipToContent: "Skip to main content",
    primaryNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    callAria: "Call Progressive Driving School",
    registerAria: "Register for a course",
    languageSwitcher: "Choose a language",
    opensInNewTab: "opens in a new tab",
  },

  nav: {
    home: "Home",
    courses: "Courses",
    requirements: "Ohio Requirements",
    contact: "Contact",
  },

  actions: {
    call: "Call now",
    register: "Register",
    viewCourses: "View courses and pricing",
    viewRequirements: "See Ohio requirements",
    contactUs: "Contact us",
    learnMore: "Learn more",
  },

  common: {
    callToConfirm: "Call to confirm",
    priceLabel: "Price",
    ageLabel: "Minimum age",
    classroomHoursLabel: "Classroom",
    driveHoursLabel: "Behind the wheel",
    includesLabel: "What's included",
    hoursUnit: "hours",
    classDBadge: "Meets Ohio Class D requirement (ages 18-20)",
    onlineBadge: "Classroom is online",
  },

  home: {
    title: "Driving School in Columbus, Ohio",
    description:
      "Driver education and behind-the-wheel training in Columbus and Franklin County. Online classroom, rolling enrollment, and instructors who work around adult schedules.",
    hero: {
      eyebrow: "Columbus and Franklin County, Ohio",
      heading: "Your Ohio driver's license, one step at a time.",
      subheading:
        "We teach new drivers in Columbus and Franklin County - including adults getting licensed for the first time. The classroom work is online and self-paced. The driving is with an instructor, scheduled around you.",
      note: "Rolling enrollment. Start whenever you're ready.",
    },
    coursesSection: {
      heading: "Courses and pricing",
      intro:
        "Three courses, priced simply. If you're not sure which one fits your situation, call us before you pay for anything.",
    },
    trust: {
      heading: "Why families and adult learners choose us",
      intro:
        "Straightforward instruction, clear pricing, and a school that answers the phone.",
      // TODO(client): this section is where years in business, number of
      // students taught, instructor certifications, insurance/bonding and
      // testimonials belong once the client provides them. Every point below
      // is derived from what he has actually confirmed - nothing is invented.
      points: [
        {
          title: "A licensed Ohio driver training school",
          body:
            "Ohio requires new drivers aged 18 to 20 to complete their Class D course at a licensed driver training school. Ours counts.",
        },
        {
          title: "Classroom on your own schedule",
          body:
            "The classroom portion is fully online. Work through it at home, in the evening, or on a day off - whenever it suits you.",
        },
        {
          title: "Start when you're ready",
          body:
            "Enrollment is rolling. You're not waiting weeks for the next class to open up.",
        },
        {
          title: "Built for adults, too",
          body:
            "Plenty of our students are adults getting licensed for the first time. You will not be the only one.",
        },
      ],
    },
    requirementsTeaser: {
      heading: "Getting licensed at 18 to 20 in Ohio",
      body:
        "Ohio asks for three things: a driver education course, {supervisedHours} logged hours of supervised practice, and a passing driving and skills test. We've laid out all three in plain language, with the official forms and links you'll need.",
    },
    serviceArea: {
      heading: "Where we teach",
      body:
        "We serve Columbus and Franklin County, Ohio.",
      pickupNote:
        "Limited student pickup is available depending on instructor availability - ask us when you book.",
    },
    finalCta: {
      heading: "Ready to get started?",
      body:
        "Call us during business hours, or send a message and we'll get back to you. Questions are free - ask before you enroll.",
    },
  },

  coursesPage: {
    title: "Courses and Pricing",
    description:
      "Driver education courses in Columbus, Ohio. Online 24-hour course with 8-hour drive, 8-hour drive only, and a 12-hour adult course for drivers 21 and older.",
    heading: "Courses and pricing",
    intro:
      "The price you see is the price of the course. If you're not sure which one you need, call us - we'd rather point you to the right course than sell you the wrong one.",
    enrollment: {
      heading: "How enrollment works",
      body:
        "Enrollment is rolling, so you can start whenever you're ready rather than waiting for a class to begin. The classroom portion is completed online at your own pace. Driving hours are scheduled with an instructor.",
    },
    help: {
      heading: "Not sure which course you need?",
      body:
        "Your situation - your age, whether you've done classroom hours elsewhere, and what the BMV needs from you - decides which course is right. Call us and we'll work it out with you.",
    },
  },

  requirementsPage: {
    title: "Ohio License Requirements, Ages 18-20",
    description:
      "What Ohio requires to get your license between 18 and 20: a Class D driver education course, 50 logged hours of supervised practice, and the driving and skills tests.",
    heading: "Getting your Ohio license at 18 to 20",
    intro:
      "This is the question we're asked most. Here's the whole path, in plain language, with the official Ohio BMV forms and links you'll need along the way.",
    audienceNote:
      "These requirements apply to new drivers aged 18 to 20 applying for an Ohio Class D license.",
    adultNote:
      "Are you 21 or older? The steps below are for drivers aged 18 to 20. Give us a call and we'll tell you what applies to your situation.",
    stepLabel: "Step {n}",
    officialLinksHeading: "Official Ohio BMV links",
    linkLabels: {
      schoolLookup: "Look up licensed Ohio driver training schools",
      fiftyHourAffidavit:
        "Download the Fifty-Hour Affidavit (form {affidavitFormNumber})",
      scheduleTest: "Schedule your driving test with the Ohio BMV",
      gdlInfo: "Ohio licensing information for new drivers",
    },
    certificateNote:
      "If the BMV can't verify your course completion electronically, you may be asked for your Driver Education Certificate at your driving or skills test. Keep a copy with you.",
    testDay: {
      heading: "What to bring to your test",
      intro:
        "Bring all of these to your driving and skills test. Arriving without one of them can cost you the appointment.",
      items: {
        tipic: "Your TIPIC (temporary instruction permit identification card)",
        vehicle:
          "A vehicle in good condition, with its license plate, make and model",
        affidavit: "Your completed {affidavitFormNumber} Fifty-Hour Affidavit",
        certificate: "A copy of your Driver Education Certificate",
      },
    },
    disclaimer:
      "These are Ohio BMV requirements, summarized here to help you plan. Progressive Driving School is a private driver training school - we are not the Ohio BMV and we don't issue licenses. Always confirm current requirements with the BMV before your appointment.",
    lastVerifiedLabel: "Ohio requirements last checked {date}.",
  },

  contactPage: {
    title: "Contact Us",
    description:
      "Call, email, or send a message to Progressive Driving School in Columbus, Ohio. We'll answer your questions before you enroll.",
    heading: "Get in touch",
    intro:
      "Call us during business hours for the fastest answer, or send a message and we'll get back to you.",
    infoHeading: "Contact details",
    phoneHeading: "Phone",
    emailHeading: "Email",
    addressHeading: "Address",
    hoursHeading: "Hours",
    serviceAreaHeading: "Service area",
    pickupNote:
      "Limited student pickup is available depending on instructor availability.",
    directionsLink: "Get directions",
  },

  courses: {
    online24plus8: {
      name: "Online 24-Hour Course + 8-Hour Drive",
      shortName: "24-Hour Course + 8-Hour Drive",
      tagline: "The complete Ohio Class D driver education course.",
      audience:
        "For new drivers aged 18 to 20 getting an Ohio license for the first time.",
      includes: [
        "{classroomHours} hours of classroom instruction, completed online at your own pace",
        "{driveHours} hours of behind-the-wheel instruction with an instructor",
        "Meets the Ohio Class D driver education requirement for ages 18 to 20",
        "Driver Education Certificate when you finish",
      ],
    },
    drive8: {
      name: "8-Hour Drive Only",
      shortName: "8-Hour Drive",
      tagline: "Behind-the-wheel instruction on its own.",
      audience:
        "For drivers who need driving hours only. Call us to confirm this is the right course for your situation.",
      includes: [
        "{driveHours} hours of behind-the-wheel instruction with an instructor",
        "Scheduled around your availability",
        "Serving Columbus and Franklin County",
      ],
    },
    adult12: {
      name: "Adult 12-Hour Drive (21 and older)",
      shortName: "Adult 12-Hour Drive",
      tagline: "Extended behind-the-wheel instruction for adult learners.",
      audience: "For drivers aged 21 and older.",
      includes: [
        "{driveHours} hours of behind-the-wheel instruction with an instructor",
        "Extra time behind the wheel for drivers starting from scratch",
        "Scheduled around work and family commitments",
      ],
    },
  },

  bmv: {
    steps: {
      education: {
        title: "Complete a driver education course",
        body:
          "Ohio requires you to complete a Class D driver education course at a licensed driver training school. That means {classroomHours} hours of classroom or online instruction, plus {driveHours} hours of driving time with an instructor. Our online course and 8-hour drive package covers both parts.",
      },
      practice: {
        title: "Log {supervisedHours} hours of supervised practice",
        body:
          "Alongside your course, you need to complete and log {supervisedHours} hours of supervised practice driving with an eligible adult. At least {nightHours} of those hours have to be at night. Record them as you go on form {affidavitFormNumber}, the Fifty-Hour Affidavit, and bring it to your test.",
      },
      test: {
        title: "Pass the driving and skills tests",
        body:
          "Once your course and your practice hours are done, schedule your driving and skills tests with the Ohio BMV. Check the list below before you go - showing up without one of these can cost you the appointment.",
      },
    },
  },

  faq: {
    heading: "Common questions",
    intro: "The things people ask us most often.",
    items: {
      whoNeedsDriverEd: {
        q: "Who needs to take a driver education course in Ohio?",
        a: "If you're between 18 and 20 and applying for your first Ohio license, you need to complete a Class D driver education course - {classroomHours} hours of classroom or online instruction plus {driveHours} hours of driving. Our online course and 8-hour drive package covers exactly that.",
      },
      classroomOnline: {
        q: "Is the classroom portion online?",
        a: "Yes. All {classroomHours} classroom hours are online and self-paced. Only your driving hours happen in person.",
      },
      whenCanIStart: {
        q: "When can I start?",
        a: "Whenever you're ready. Enrollment is rolling, so you're not waiting for the next class to open. Call or send us a message and we'll get you set up.",
      },
      howLongToFinish: {
        q: "How long does it take to finish?",
        a: "It depends on how quickly you work through the online classroom hours and how we're able to schedule your driving. Give us a call and we'll give you a realistic timeline for your situation.",
      },
      doYouProvideCar: {
        // TODO(client): confirm whether the school provides the vehicle for
        // behind-the-wheel hours, and what else the price includes. Answered
        // honestly rather than guessed.
        q: "Do you provide a car for the driving hours?",
        a: "Call us and we'll go over exactly what's included with your driving hours and what, if anything, you need to bring.",
      },
      pickup: {
        q: "Do you pick students up?",
        a: "We offer limited student pickup depending on instructor availability. Ask us when you book and we'll tell you what we can do.",
      },
      adultLearners: {
        q: "I'm over 21 and learning to drive for the first time. Can you help?",
        a: "Yes. Our 12-hour adult course is built for drivers 21 and older. Call us and we'll go over what Ohio asks of you and how many hours make sense.",
      },
      somaliSupport: {
        // TODO(client): confirm that instruction and phone support really are
        // available in Somali before this answer is made more specific. A
        // bilingual site implies Somali-speaking service - don't over-promise.
        q: "Do you offer help in Somali?",
        a: "Call us and let us know which language you'd prefer, and we'll do our best to help.",
      },
      whatToBring: {
        // TODO(client): "what to bring" was never fully answered. In
        // particular: does a student need a TIPIC in hand before their FIRST
        // behind-the-wheel lesson? The BMV source material mentions the TIPIC
        // only in connection with test day.
        q: "What do I need to bring to my first driving lesson?",
        a: "We'll tell you exactly what to bring when we schedule your first lesson. If you're not sure whether you have everything you need, call us first.",
      },
      howToRegister: {
        q: "How do I register?",
        a: "Use the Register button at the top of any page, or call us during business hours. We're happy to answer questions before you commit to anything.",
      },
    },
  },

  form: {
    heading: "Send us a message",
    intro:
      "Tell us a little about what you need and we'll get back to you. If you'd rather talk to someone now, call us.",
    nameLabel: "Your name",
    namePlaceholder: "First and last name",
    phoneLabel: "Phone number",
    phonePlaceholder: "614-555-0100",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    languageLabel: "Preferred language",
    // Keep paired labels short: this one sits beside "Preferred language"
    // in a two-column row, and a label that wraps misaligns the two selects.
    courseLabel: "Course of interest",
    coursePlaceholder: "Select a course",
    courseOther: "Not sure yet / something else",
    messageLabel: "Your message",
    messagePlaceholder:
      "Tell us your age, whether you've done any classroom hours already, and when you'd like to start.",
    optionalSuffix: "(optional)",
    submit: "Send message",
    submitting: "Sending...",
    successHeading: "Thanks - your message is on its way.",
    successBody:
      "We'll get back to you as soon as we can. If it's urgent, give us a call.",
    errorHeading: "That didn't send.",
    errorBody:
      "Something went wrong on our end. Please call us at {phone} and we'll take care of it.",
    privacyNote:
      "We use your details only to reply to you. We don't sell them or share them with anyone else.",
    errors: {
      nameRequired: "Please tell us your name.",
      contactRequired: "Please give us a phone number or an email address.",
      emailInvalid: "That email address doesn't look right.",
      messageRequired: "Please tell us how we can help.",
    },
  },

  footer: {
    tagline:
      "Driver education and behind-the-wheel training in Columbus and Franklin County, Ohio.",
    navHeading: "Pages",
    contactHeading: "Contact",
    hoursHeading: "Hours",
    serviceAreaHeading: "Service area",
    officialLinksHeading: "Ohio BMV links",
    rights: "© {year} {name}. All rights reserved.",
    disclaimer:
      "Progressive Driving School is a private driver training school and is not affiliated with the Ohio Bureau of Motor Vehicles.",
  },

  media: {
    heroPrimary:
      "A Progressive Driving School instructor and student beside a training car",
    coursesBanner: "A Progressive Driving School training vehicle",
    trustPortrait: "A Progressive Driving School driving instructor",
    requirementsBanner: "A student driver at the wheel during a lesson",
    contactExterior: "The entrance to the Progressive Driving School office",
  },
} satisfies Copy;

export default en;
