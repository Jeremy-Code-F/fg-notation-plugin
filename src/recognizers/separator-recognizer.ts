import { Cursor } from "cursor";
import { Separator } from "types";

export class SeparatorRecognizer {
	SEPARATOR_MAP: Record<string, Separator> = Object.fromEntries(
		Object.values(Separator).map((v) => [v, v as Separator]),
	);

	RecognizeSeparator(cursor: Cursor): string | null {
		let value = cursor.Peek();

		if (value === null) {
			return null;
		}

		if (value in this.SEPARATOR_MAP) {
			return cursor.Consume();
		}

		return null;
	}
}
