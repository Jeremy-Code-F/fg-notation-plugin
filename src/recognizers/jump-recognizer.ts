import { Cursor } from "cursor";

export class JumpRecognizer {
	RecognizeJump(cursor: Cursor): boolean {
		let value = cursor.PeekAhead(2);

		if (value !== "j.") {
			return false;
		}

		cursor.ConsumeMultiple(2);

		return true;
	}
}
