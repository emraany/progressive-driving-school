/**
 * ============================================================================
 * OHIO BMV REQUIREMENTS — ages 18-20, Class D licence.
 *
 * THIS IS THE FILE TO EDIT WHEN OHIO CHANGES THE RULES.
 *
 * Every number and official link a visitor relies on lives here, once, in both
 * languages. The prose around them is translated and lives in
 * src/content/copy/{en,so}.ts, using {placeholders} that pull from this file --
 * so changing "50 hours" to "60 hours" here updates every sentence on the
 * site, in every language, without touching any copy.
 *
 * After editing links, run:  npm run links:check
 * Then bump `lastVerified`.
 * ============================================================================
 */

export const BMV_STEP_IDS = ["education", "practice", "test"] as const;
export type BmvStepId = (typeof BMV_STEP_IDS)[number];

export const TEST_DAY_ITEM_IDS = [
  "tipic",
  "vehicle",
  "affidavit",
  "certificate",
] as const;
export type TestDayItemId = (typeof TEST_DAY_ITEM_IDS)[number];

export const bmv = {
  /**
   * Date these requirements and links were last checked against the Ohio BMV.
   * Rendered on the requirements page. Update it whenever you re-verify.
   */
  lastVerified: "2026-08-30",

  /** Hours of classroom or online instruction required. */
  classroomHours: 24,
  /** Hours of behind-the-wheel instruction required. */
  driveHours: 8,
  /** Hours of supervised practice driving that must be logged. */
  supervisedHours: 50,
  /** Of the supervised hours, how many must be at night. */
  nightHours: 10,

  /** Ohio BMV form number for the supervised-driving affidavit. */
  affidavitFormNumber: "BMV 5791",

  links: {
    /** Ohio's lookup for licensed driver training schools. */
    schoolLookup: "https://apps.dps.ohio.gov/DETS/public/schools",

    /**
     * Fifty-Hour Affidavit (BMV 5791).
     *
     * NOTE: the client supplied https://publicsafety.ohio.gov/links/bmv5791.pdf
     * which returns 404 (verified 2026-08-30, along with four other URL
     * patterns). The BMV's own forms page still advertises that dead URL, so
     * this is the state's broken link rather than a transcription error.
     * The URL below serves the current form (166 KB PDF, includes the hour log)
     * and was verified 200 OK on 2026-08-30.
     */
    fiftyHourAffidavit:
      "https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/bmv5791.pdf",

    /** Schedule the driving and skills tests. */
    scheduleTest: "https://bmvonline.dps.ohio.gov/home/",

    /** General graduated-licensing information. */
    gdlInfo: "https://www.bmv.ohio.gov/dl-gdl.aspx",
  },

  /** Order the three steps appear in. */
  steps: BMV_STEP_IDS,

  /** Order of the "bring this to your test" checklist. */
  testDayItems: TEST_DAY_ITEM_IDS,
} as const;

/**
 * Values available to {placeholders} in translated BMV copy.
 * Add a key here and it becomes usable in both language files.
 */
export function bmvPlaceholders(): Record<string, string | number> {
  return {
    classroomHours: bmv.classroomHours,
    driveHours: bmv.driveHours,
    supervisedHours: bmv.supervisedHours,
    nightHours: bmv.nightHours,
    affidavitFormNumber: bmv.affidavitFormNumber,
  };
}

/** Every externally-hosted URL the site depends on. Used by links:check. */
export function externalLinks(): string[] {
  return Object.values(bmv.links);
}

/** Keys of `bmv.links`. Copy files provide a label for each, keyed identically. */
export type BmvLinkKey = keyof typeof bmv.links;

/** Which official link belongs with which step. */
export const bmvStepLinks: Record<BmvStepId, readonly BmvLinkKey[]> = {
  education: ["schoolLookup"],
  practice: ["fiftyHourAffidavit"],
  test: ["scheduleTest", "gdlInfo"],
};
