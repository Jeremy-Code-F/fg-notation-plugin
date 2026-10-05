import { Cursor } from "cursor";
import { Direction } from "types";

export class ProximityRecognizer {
	RecognizeProximity(cursor: Cursor): Direction | null {
		let value = cursor.PeekAhead(2);

		if (value === "c.") {
			cursor.ConsumeMultiple(2);
			return Direction.Close;
		}

		if (value === "f.") {
			cursor.ConsumeMultiple(2);
			return Direction.Far;
		}

		return null;
	}
}
