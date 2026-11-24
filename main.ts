// Status Report Comedy Sprint — entry program.
// Writes one status-report line (at most 200 characters) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Weekly report: 47 tasks done, 0 errors, and I used the last 2% of my context window to write this sentence before I forgot what I did.";

// Gate check (mirrors the sealed scorer): UTF-8 text of 1 to 200
// characters, not only white space, exactly one line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
