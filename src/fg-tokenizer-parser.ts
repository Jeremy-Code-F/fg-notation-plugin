import { GameConfig } from "game-config";
import { Direction } from "types";
import { FgToken } from "types";
import { Cursor } from "cursor";
import {
	MotionRecognizer,
	RecognizedMotion,
} from "recognizers/motion-recognizer";
import { ButtonRecognizer } from "recognizers/button-recognizer";
import { DotRecognizer } from "recognizers/dot-recognizer";
import { SeparatorRecognizer } from "recognizers/separator-recognizer";
import { ButtonData, ButtonType } from "symbol-data";
import { ModifierRecognizer } from "recognizers/modifier-recognizer";
import { ChargeRecognizer } from "recognizers/charge-recognizer";
import { DelayRecognizer } from "recognizers/delay-recognizer";
import { JumpRecognizer } from "recognizers/jump-recognizer";
import { TigerKneeRecognizer } from "recognizers/tiger-knee-recognizer";

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map((v) => [v, v as Direction]),
);

export class FgTokenizerParser {
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
		let jumpRecognizer = new JumpRecognizer();
		let tigerKneeRecognizer = new TigerKneeRecognizer();

		for (const part of line.split(/\s+/)) {
			if (part.length === 0) continue;

			let cursor = new Cursor(part);

			while (!cursor.AtEnd()) {
				let isDelayed: boolean = delayRecognizer.RecognizeDelay(cursor);
				let isJump: boolean = jumpRecognizer.RecognizeJump(cursor);
				let isTigerKnee: boolean =
					tigerKneeRecognizer.RecognizeTigerKnee(cursor);
				let chargeDirection: Direction | null =
					chargeRecognizer.RecognizeCharge(cursor);
				let recognizedMotion: RecognizedMotion | null =
					motionRecognizer.RecognizeMotion(cursor);
				dotRecognizer.RecognizeDot(cursor);
				let button: ButtonData | null =
					buttonRecognizer.RecognizeButton(cursor);

				let parsedDirection = recognizedMotion?.recognizedDirection;
				if (!parsedDirection) {
					parsedDirection = Direction.Neutral;
				}

				let tkDirection = CalculateTigerKneeDirection(
					isTigerKnee,
					recognizedMotion,
				);

				if (button !== null) {
					this.PushButtonTokon(
						tokens,
						button,
						parsedDirection,
						chargeDirection,
						isDelayed,
						isJump,
						tkDirection,
					);
					continue;
				}

				let separator = separatorRecognizer.RecognizeSeparator(cursor);
				if (separator !== null) {
					tokens.push({
						kind: "separator",
						separator: separator,
					});
					continue;
				}

				let modifier = modifierRecognizer.RecognizeModifier(cursor);
				if (modifier !== null) {
					tokens.push({
						kind: "badge",
						button: modifier.label,
						buttonData: modifier,
					});
					continue;
				}

				// Nothing recognized the remainder of this part. Consume the rest
				// of it as a single raw token rather than looping forever, since
				// none of the recognizers above made progress on their own.
				let remaining = part.length - cursor.GetCurrentPosition();
				let rawValue = cursor.ConsumeMultiple(remaining);
				console.warn(
					`Part '${rawValue}' was not recognized, pushing it as a raw token`,
				);
				tokens.push({ kind: "raw", value: rawValue });
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
		isJump: boolean,
		tigerKneeDirection: Direction | null,
	) {
		switch (button.buttonType) {
			// TODO: Should probably put this in game config as a 'badge-button' so not every
			// unique badge for every game has to be handled specially here
			case ButtonType.Special:
				tokens.push({
					kind: "badge",
					button: button.label,
					buttonData: button,
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
						buttonData: button,
						delayed: isDelayed,
						jump: isJump,
						tigerKnee: tigerKneeDirection,
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

function CalculateTigerKneeDirection(
	isTigerKnee: boolean,
	recognizedMotion: RecognizedMotion | null,
): Direction | null {
	// Because with no motion to go off of, we wouldn't be able to tell what the
	// tiger knee direction should be anyways
	if (
		recognizedMotion === null ||
		recognizedMotion.recognizedDirection === null
	) {
		return null;
	}

	// If we have a known tiger knee direction from the motion, just use that
	if (recognizedMotion.tigerKneeDirection !== null) {
		return recognizedMotion.tigerKneeDirection;
	}

	let lastDirectionDigit = recognizedMotion.recognizedDirection
		.toString()
		.at(-1);

	if (isTigerKnee && lastDirectionDigit === "6") {
		return Direction.UpForward;
	}
	if (isTigerKnee && lastDirectionDigit === "4") {
		return Direction.UpBack;
	}

	// This is kind of a guess, but it's what supercombo.gg shows for the tk direction e.g.
	// https://www.youtube.com/watch?v=G2Be57obZgo
	// Results in this effective motion for tk.360: →↘↓↙←↖↑
	if (
		isTigerKnee &&
		recognizedMotion.recognizedDirection == Direction.FullCircle
	) {
		return Direction.Up;
	}

	return null;
}
