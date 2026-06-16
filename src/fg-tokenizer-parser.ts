import { IFgParser } from "fg-parser";
import { GameConfig } from "game-config";
import { Direction, Separator } from "types";
import { FgToken } from "types";
import { Cursor } from "cursor";
import { MotionRecognizer } from "recognizers/motion-recognizer";
import { ButtonRecognizer } from "recognizers/button-recognizer";
import { DotRecognizer } from "recognizers/dot-recognizer";
import { SeparatorRecognizer } from "recognizers/separator-recognizer";

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map((v) => [v, v as Direction]),
);
const SEPARATOR_MAP: Record<string, Separator> = Object.fromEntries(
	Object.values(Separator).map((v) => [v, v as Separator]),
);

export class FgTokenizerParser implements IFgParser {
	private cursor: number = 0;
	private gameConfig: GameConfig;
	constructor(private config: GameConfig) {
		this.gameConfig = config;
	}

	parseLine(line: string): FgToken[] {
		const tokens: FgToken[] = [];
		let motionRecognizer = new MotionRecognizer();
		let dotRecognizer = new DotRecognizer();
		let buttonRecognizer = new ButtonRecognizer(this.gameConfig);
		let separatorRecognizer = new SeparatorRecognizer();

		for (const part of line.split(/\s+/)) {
			if (part.length === 0) continue;

			let cursor = new Cursor(part);
			let motion: string | null =
				motionRecognizer.RecognizeMotion(cursor);
			dotRecognizer.RecognizeDot(cursor);
			let button: string | null =
				buttonRecognizer.RecognizeButton(cursor);

			let parsedDirection: Direction | null = null;
			if (motion !== null) {
				parsedDirection = this.parseDirection(motion);
			}
			if (parsedDirection === null) {
				parsedDirection = Direction.Neutral;
			}

			if (button !== null) {
				this.PushButtonTokon(tokens, button, parsedDirection);
				continue;
			}

			let separator = separatorRecognizer.RecognizeSeparator(cursor);
			if (separator !== null) {
				let parsedSeparator = this.parseSeparator(separator);
				if (parsedSeparator !== null) {
					tokens.push({
						kind: "separator",
						separator: parsedSeparator,
					});
				}
			}
		}

		return tokens;
	}
	PushButtonTokon(
		tokens: FgToken[],
		button: string,
		parsedDirection: Direction,
	) {
		switch (button) {
			case "DI":
				tokens.push({
					kind: "badge",
					button: button,
				});
				break;
			default:
				tokens.push({
					kind: "input",
					direction: parsedDirection,
					button: button,
					delayed: false,
					tigerKnee: false,
				});
				break;
		}
	}

	parseFgSource(source: string): FgToken[][] {
		return source
			.split("\n")
			.filter((line) => line.trim().length > 0)
			.map((line) => this.parseLine(line.trim()));
	}

	private parseDirection(raw: string): Direction | null {
		return DIRECTION_MAP[raw] ?? null;
	}
	private parseSeparator(raw: string): Separator | null {
		return SEPARATOR_MAP[raw] ?? null;
	}
}
