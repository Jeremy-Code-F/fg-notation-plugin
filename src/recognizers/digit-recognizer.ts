import { Cursor } from "cursor";

export class DigitRecognizer {
	RecognizeDigit(cursor: Cursor): string | null {
		let value = cursor.Peek();

		if (value === null) {
			return null;
		}

		if (isNaN(+value)) {
			return null;
		}

		return cursor.Consume();
	}
}
