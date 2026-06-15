import { Cursor } from "cursor";
import { DigitRecognizer } from "./digit-recognizer";

export class MotionRecognizer {
	private digitRecognizier = new DigitRecognizer();

	RecognizeMotion(cursor: Cursor): string | null {
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

		if (digits.length > 0) {
			return digits.join("");
		}
		return null;
	}
}
