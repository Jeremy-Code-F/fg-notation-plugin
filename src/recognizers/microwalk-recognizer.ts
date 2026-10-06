import { Cursor } from "cursor";

const MICROWALK = "microwalk";

export class MicrowalkRecognizer {
	RecognizeMicrowalk(cursor: Cursor): boolean {
		let value = cursor.PeekAhead(MICROWALK.length);

		if (value?.toLowerCase() !== MICROWALK) {
			return false;
		}

		cursor.ConsumeMultiple(MICROWALK.length);

		return true;
	}
}
