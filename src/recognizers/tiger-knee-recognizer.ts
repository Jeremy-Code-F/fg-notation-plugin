import { Cursor } from "cursor";

export class TigerKneeRecognizer {
	RecognizeTigerKnee(cursor: Cursor): boolean {
		let potentialTk = cursor.PeekAhead(3);
		if (potentialTk === "tk.") {
			cursor.ConsumeMultiple(3);
			return true;
		}
		return false;
	}
}
