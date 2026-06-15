import { GameConfig } from "game-config";
import { Cursor } from "cursor";

export class ButtonRecognizer {
	private gameConfig: GameConfig;
	constructor(gameConfig: GameConfig) {
		this.gameConfig = gameConfig;
	}

	RecognizeButton(cursor: Cursor): string | null {
		let matchedKey = "";
		for (const key in this.gameConfig.inputData) {
			let peekedCharacters = cursor.PeekAhead(key.length);
			if (peekedCharacters == null) {
				continue;
			}

			if (peekedCharacters == key && key.length > matchedKey.length) {
				matchedKey = peekedCharacters;
			}
		}

		if (matchedKey === "") {
			return null;
		}

		let consumedCharacters = cursor.ConsumeMultiple(matchedKey.length);
		return consumedCharacters;
	}
}
