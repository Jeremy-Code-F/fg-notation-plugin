import { Cursor } from "cursor";
import { Direction } from "types";

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map((v) => [v, v as Direction]),
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
		if (parsedDirection === undefined) {
			console.warn(
				`ChargeRecognizer recognized digit ${potentialDigit} as a number, but it was not in DIRECTION_MAP`,
			);
			return null;
		}
		cursor.ConsumeMultiple(3);

		return parsedDirection;
	}
}
