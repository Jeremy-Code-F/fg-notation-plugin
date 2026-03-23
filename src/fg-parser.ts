import { Direction, Separator } from "types";
import { FgToken } from "types";
import { GameConfig } from "./game-config";

export interface IFgParser {
	parseFgSource(line: String): FgToken[][];
}

const SEPARATOR_RE = /^(>|,|\+|~)$/;

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map((v) => [v, v as Direction]),
);
const SEPARATOR_MAP: Record<string, Separator> = Object.fromEntries(
	Object.values(Separator).map((v) => [v, v as Separator]),
);

export class FgParser implements IFgParser {
	private inputRe: RegExp;
	private chargeInputRe: RegExp;

	constructor(private config: GameConfig) {
		const btn = config.buttonPattern;
		this.inputRe = new RegExp(`^([j]|[1-9]+)\\.(${btn})$`);
		this.chargeInputRe = new RegExp(`^\\[([1-9])\\]([1-9j]+)\\.(${btn})$`);
	}

	parseDirection(raw: string): Direction | null {
		return DIRECTION_MAP[raw] ?? null;
	}

	parseButton(raw: string): string | null {
		return raw in this.config.buttonData ? raw : null;
	}

	parseSeparator(raw: string): Separator | null {
		return SEPARATOR_MAP[raw] ?? null;
	}

	parseLine(line: string): FgToken[] {
		const tokens: FgToken[] = [];
		console.log(
			`parseLine: inputRe=${this.inputRe.toString()} for game: ${this.config.gameName}`,
		);
		for (const part of line.split(/\s+/)) {
			if (part.length === 0) continue;
			console.log(`  testing part="${part}" against inputRe`);

			const inputMatch = this.inputRe.exec(part);
			if (inputMatch) {
				const [, rawDir, rawBtn] = inputMatch;
				if (rawDir !== undefined && rawBtn !== undefined) {
					const direction = this.parseDirection(rawDir);
					const button = this.parseButton(rawBtn);
					console.log(`Button ${rawBtn} parsed as '${button}'`);
					if (direction !== null && button !== null) {
						tokens.push({ kind: "input", direction, button });
						continue;
					}
				}
			}

			const chargeMatch = this.chargeInputRe.exec(part);
			if (chargeMatch) {
				const [, rawCharge, rawDir, rawBtn] = chargeMatch;
				if (
					rawCharge !== undefined &&
					rawDir !== undefined &&
					rawBtn !== undefined
				) {
					const charge = this.parseDirection(rawCharge);
					const direction = this.parseDirection(rawDir);
					const button = this.parseButton(rawBtn);
					if (
						charge !== null &&
						direction !== null &&
						button !== null
					) {
						tokens.push({
							kind: "charge-input",
							charge,
							direction,
							button,
						});
						continue;
					}
				}
			}

			if (SEPARATOR_RE.test(part)) {
				const separator = this.parseSeparator(part);
				if (separator !== null) {
					tokens.push({ kind: "separator", separator });
					continue;
				}
			}

			if (this.config.modifierBadgeRe.test(part)) {
				const button = this.parseButton(part.replace(/[\[\]]/g, ""));
				if (button !== null) {
					tokens.push({ kind: "badge", button });
					continue;
				}
			}

			if (this.config.standaloneBadgeRe.test(part)) {
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
