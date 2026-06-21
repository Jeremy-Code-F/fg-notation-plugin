import { Cursor } from "cursor";

export class DelayRecognizer {
	RecognizeDelay(cursor: Cursor): boolean {
		let value = cursor.PeekAhead(2);

		if (value !== "d.") {
			return false;
		}

		cursor.ConsumeMultiple(2);

		return true;
	}
}
