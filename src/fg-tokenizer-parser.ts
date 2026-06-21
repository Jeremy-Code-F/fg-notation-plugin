import { IFgParser } from "fg-parser";
import { GameConfig } from "game-config";
import { Direction } from "types";
import { FgToken } from "types";
import { Cursor } from "cursor";
import { MotionRecognizer } from "recognizers/motion-recognizer";
import { ButtonRecognizer } from "recognizers/button-recognizer";
import { DotRecognizer } from "recognizers/dot-recognizer";
import { SeparatorRecognizer } from "recognizers/separator-recognizer";
import { ButtonData, ButtonType } from "symbol-data";
import { ModifierRecognizer } from "recognizers/modifier-recognizer";
import { ChargeRecognizer } from "recognizers/charge-recognizer";
import { DelayRecognizer } from "recognizers/delay-recognizer";

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map((v) => [v, v as Direction]),
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
		let modifierRecognizer = new ModifierRecognizer(this.gameConfig);
		let chargeRecognizer = new ChargeRecognizer();
		let delayRecognizer = new DelayRecognizer();

		for (const part of line.split(/\s+/)) {
			if (part.length === 0) continue;

			let cursor = new Cursor(part);

			let isDelayed: boolean = delayRecognizer.RecognizeDelay(cursor);
			let chargeDirection: Direction | null =
				chargeRecognizer.RecognizeCharge(cursor);
			let motion: string | null =
				motionRecognizer.RecognizeMotion(cursor);
			dotRecognizer.RecognizeDot(cursor);
			let button: ButtonData | null =
				buttonRecognizer.RecognizeButton(cursor);

			let parsedDirection: Direction | null = null;
			if (motion !== null) {
				parsedDirection = this.parseDirection(motion);
			}
			if (parsedDirection === null) {
				parsedDirection = Direction.Neutral;
			}

			if (button !== null) {
				this.PushButtonTokon(
					tokens,
					button,
					parsedDirection,
					chargeDirection,
					isDelayed,
				);
				continue;
			}

			let separator = separatorRecognizer.RecognizeSeparator(cursor);
			if (separator !== null) {
				tokens.push({
					kind: "separator",
					separator: separator,
				});
			}

			let modifier = modifierRecognizer.RecognizeModifier(cursor);
			if (modifier !== null) {
				tokens.push({
					kind: "badge",
					button: modifier.label,
				});
			}
		}

		return tokens;
	}
	PushButtonTokon(
		tokens: FgToken[],
		button: ButtonData,
		parsedDirection: Direction,
		chargeDirection: Direction | null,
		isDelayed: boolean,
	) {
		switch (button.buttonType) {
			// TODO: Should probably put this in game config as a 'badge-button' so not every
			// unique badge for every game has to be handled specially here
			case ButtonType.Special:
				tokens.push({
					kind: "badge",
					button: button.label,
				});
				break;
			default:
				if (chargeDirection !== null) {
					tokens.push({
						kind: "charge-input",
						charge: chargeDirection,
						direction: parsedDirection,
						button: button.label,
					});
				} else {
					tokens.push({
						kind: "input",
						direction: parsedDirection,
						button: button.label,
						delayed: isDelayed,
						tigerKnee: false,
					});
				}
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
}
