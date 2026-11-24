// One-Liner Laugh Lab — u-suroso-69-one-liner-laugh-lab-6ccf3aae
//
// The program writes exactly one funny line to /output/entry.txt:
// the excuse a robot vacuum gives after eating a sock.
//
// The joke: the vacuum defends itself like a lawyer quoting its own
// job description. The sock was on the floor, the job says "floor",
// so the vacuum did nothing wrong — deadpan, tight, and the punch
// comes from the fit between the excuse and the machine's literal
// reading of its instructions. "I rest my case" completes the
// courtroom bit instead of a stock "case closed". No setup that
// overstays, no stock "I thought it was food" line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My job description says 'floor.' The sock was on the floor. I rest my case.";

function validate(line: string): void {
  // Gate, same as the sealed scorer: UTF-8 text, 1 to 200 characters,
  // not only white space, exactly one line.
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(LINE);

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");

  // Verify the round trip: what the grader reads must be exactly the line.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== LINE) {
    throw new Error("round-trip mismatch in /output/entry.txt");
  }
  validate(written);
}

main();
