import { Cursor } from "cursor";
import { Direction } from "types";

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map((v) => [v, v]),
);

export class ChargeRecognizer {
	RecognizeCharge(cursor: Cursor): Direction | null {
		let potentialCharge = cursor.PeekAhead(3);
		if (potentialCharge === null) {
			return null;
		}

		if (potentialCharge[0] !== "[") {
			return null;
		}
		if (potentialCharge[2] !== "]") {
			return null;
		}

		let potentialDigit = potentialCharge[1];
		if (potentialDigit === undefined) {
			return null;
		}

		if (isNaN(+potentialDigit)) {
			return null;
		}

		let parsedDirection = DIRECTION_MAP[potentialDigit];
		// e.g. "[0]", which is a number but not a direction
		if (parsedDirection === undefined) {
			return null;
		}
		cursor.ConsumeMultiple(3);

		return parsedDirection;
	}
}
