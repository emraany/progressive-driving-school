/**
 * FAQ question order. The questions and answers themselves are translated and
 * live in the copy files, keyed by these ids — so a question that exists in
 * English but not Somali is a compile error, not a blank space on a live page.
 *
 * To add a question: add an id here, then add the q/a to BOTH copy files.
 */
export const FAQ_IDS = [
  "whoNeedsDriverEd",
  "classroomOnline",
  "whenCanIStart",
  "howLongToFinish",
  "doYouProvideCar",
  "pickup",
  "adultLearners",
  "somaliSupport",
  "whatToBring",
  "howToRegister",
] as const;

export type FaqId = (typeof FAQ_IDS)[number];
