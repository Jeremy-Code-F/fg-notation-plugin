import { Cursor } from "cursor";

export class DotRecognizer {
	RecognizeDot(cursor: Cursor): string | null {
		let value = cursor.Peek();
		if (value === null) {
			return null;
		}

		if (value === ".") {
			return cursor.Consume();
		}

		return null;
	}
}
