import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { SF6_CONFIG } from "./games/sf6";
import { FgTokenizerParser } from "./fg-tokenizer-parser";

// Keeps the README and example notes in sync with the parser: every line in
// an fg/fg-sf6 block must parse without falling back to a raw token.

// Vitest runs from the repo root
const repoRoot = process.cwd();
const examplesDir = join(repoRoot, "examples");

const docFiles = [
	"README.md",
	...readdirSync(examplesDir)
		.filter((name) => name.endsWith(".md"))
		.map((name) => `examples/${name}`),
];

/** Return every non-blank line inside a ```fg or ```fg-sf6 block. */
function notationLines(markdown: string): string[] {
	const lines: string[] = [];
	let inBlock = false;
	for (const line of markdown.split("\n")) {
		const trimmed = line.trim();
		if (!inBlock && /^```fg(-sf6)?$/.test(trimmed)) {
			inBlock = true;
		} else if (inBlock && trimmed === "```") {
			inBlock = false;
		} else if (inBlock && trimmed.length > 0) {
			lines.push(trimmed);
		}
	}
	return lines;
}

describe("docsExamples", () => {
	const parser = new FgTokenizerParser(SF6_CONFIG);

	describe.each(docFiles)("%s", (file) => {
		const lines = notationLines(readFileSync(join(repoRoot, file), "utf8"));

		it("has notation examples", () => {
			expect(lines.length).toBeGreaterThan(0);
		});

		it.each(lines)("parses '%s' without raw tokens", (line) => {
			const raw = parser
				.parseLine(line)
				.filter((token) => token.kind === "raw");
			expect(raw).toEqual([]);
		});
	});
});
