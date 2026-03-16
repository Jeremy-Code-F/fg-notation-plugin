import { Button, Direction, Separator } from "types";
import { FgToken } from "types";

export interface IFgParser {
	parseFgSource(line: String): FgToken[][];
}

const INPUT_RE = /^([j]|[1-9]+)\.([LMH][PK])$/;
const SEPARATOR_RE = /^(>|,|\+|~)$/;
const STANDALONE_BUTTON_RE = /^(DRC|DR|DI)$/;
const MODIFIER_RE = /^(\[CH\]|\[PC\])$/;

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map((v) => [v, v as Direction]),
);

const BUTTON_MAP: Record<string, Button> = Object.fromEntries(
	Object.values(Button).map((v) => [v, v as Button]),
);
const SEPARATOR_MAP: Record<string, Separator> = Object.fromEntries(
	Object.values(Separator).map((v) => [v, v as Separator]),
);

export class FgParser implements IFgParser {
	parseDirection(raw: string): Direction | null {
		return DIRECTION_MAP[raw] ?? null;
	}
	parseButton(raw: string): Button | null {
		return BUTTON_MAP[raw] ?? null;
	}
	parseSeparator(raw: string): Separator | null {
		return SEPARATOR_MAP[raw] ?? null;
	}

	parseLine(line: string): FgToken[] {
		const tokens: FgToken[] = [];
		for (const part of line.split(/\s+/)) {
			if (part.length === 0) continue;

			const inputMatch = INPUT_RE.exec(part);
			if (inputMatch) {
				const [, rawDir, rawBtn] = inputMatch;
				if (rawDir !== undefined && rawBtn !== undefined) {
					const direction = this.parseDirection(rawDir);
					const button = this.parseButton(rawBtn);
					if (direction !== null && button !== null) {
						tokens.push({ kind: "input", direction, button });
						continue;
					}
				}
			}

			if (SEPARATOR_RE.test(part)) {
				console.log(`Testing separator RE on part '${part}'`);
				const separator = this.parseSeparator(part);
				if (separator !== null) {
					console.log(`Separator was parsed from part ${part}`);
					tokens.push({ kind: "separator", separator });
					continue;
				} else {
					console.log(
						`Separator RE matched for part '${separator}', but it could not be parsed as a separator`,
					);
				}
			}

			if (MODIFIER_RE.test(part)) {
				const button = this.parseButton(part.replace(/[\[\]]/g, ""));
				if (button !== null) {
					tokens.push({ kind: "badge", button });
					continue;
				}
			}

			if (STANDALONE_BUTTON_RE.test(part)) {
				const button = this.parseButton(part);
				if (button !== null) {
					tokens.push({ kind: "badge", button });
					continue;
				}
			}

			tokens.push({ kind: "raw", value: part });
		}
		return tokens;
	}

	parseFgSource(source: string): FgToken[][] {
		return source
			.split("\n")
			.filter((line) => line.trim().length > 0)
			.map((line) => this.parseLine(line.trim()));
	}
}
