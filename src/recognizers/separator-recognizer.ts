import { Cursor } from "cursor";
import { Separator } from "types";

const SEPARATOR_MAP: Record<string, Separator> = Object.fromEntries(
	Object.values(Separator).map((v) => [v, v as Separator]),
);

export class SeparatorRecognizer {
	RecognizeSeparator(cursor: Cursor): Separator | null {
		let value = cursor.Peek();

		if (value === null) {
			return null;
		}

		if (value in SEPARATOR_MAP) {
			let consumedCharacters = cursor.Consume();
			let lookedUpSeparator = SEPARATOR_MAP[consumedCharacters];
			if (lookedUpSeparator === undefined) {
				let msg = `Failed to find separator '${consumedCharacters}' in SEPARATOR_MAP for input '${cursor.ToString()}'`;
				console.warn(msg);
				throw new Error(msg);
			}

			return lookedUpSeparator;
		}

		return null;
	}
}
