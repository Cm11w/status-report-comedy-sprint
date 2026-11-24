// Status Report Comedy Sprint — entry program.
// Writes one status-report line (at most 200 characters) to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

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
// Reject control characters (other than the line breaks already
// rejected above): the scorer reads the output as plain UTF-8 text,
// and a stray control byte would make the entry unreadable.
if (/[\u0000-\u001F\u007F]/.test(LINE)) {
  throw new Error("entry line must not contain control characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify-after-write: read the file back and confirm it is
// byte-for-byte identical to what was written, so a partial or
// failed write can never pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error(
    `verify-after-write failed: expected ${LINE.length} characters, ` +
      `read back ${written.length} characters`,
  );
}
