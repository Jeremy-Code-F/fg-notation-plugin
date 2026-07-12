import { Cursor } from "cursor";
import { DigitRecognizer } from "./digit-recognizer";
import { Direction } from "types";

export interface RecognizedMotion {
	recognizedDirection: Direction | null;
	tigerKneeDirection: Direction | null;
}

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map((v) => [v, v as Direction]),
);

export class MotionRecognizer {
	private digitRecognizier = new DigitRecognizer();

	RecognizeMotion(cursor: Cursor): RecognizedMotion | null {
		let digits = [];
		let recognizeDigits = true;

		while (recognizeDigits) {
			let recognizedDigit = this.digitRecognizier.RecognizeDigit(cursor);
			if (recognizedDigit === null) {
				recognizeDigits = false;
			} else {
				digits.push(recognizedDigit);
			}
		}

		if (digits.length === 0) {
			return null;
		}

		let joinedDigits = digits.join("");
		let lastDigit = joinedDigits.charAt(joinedDigits.length - 1);

		if (lastDigit === "7" || lastDigit === "8" || lastDigit === "9") {
			let withoutTigerKneeDigit = joinedDigits.slice(0, -1);
			let recognizedWithoutTigerKneeDigit = this.parseDirection(
				withoutTigerKneeDigit,
			);

			if (recognizedWithoutTigerKneeDigit !== null) {
				return {
					recognizedDirection: recognizedWithoutTigerKneeDigit,
					tigerKneeDirection: this.parseDirection(lastDigit),
				};
			}
		}

		return {
			recognizedDirection: this.parseDirection(joinedDigits),
			tigerKneeDirection: null,
		};
	}

	private parseDirection(raw: string): Direction | null {
		return DIRECTION_MAP[raw] ?? null;
	}
}
