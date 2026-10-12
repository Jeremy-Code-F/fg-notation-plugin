import { GameConfig } from "game-config";
import { Cursor } from "cursor";
import { ButtonData } from "symbol-data";

export class ButtonRecognizer {
	private gameConfig: GameConfig;
	constructor(gameConfig: GameConfig) {
		this.gameConfig = gameConfig;
	}

	RecognizeButton(cursor: Cursor): ButtonData | null {
		let matchedKey = "";
		for (const key in this.gameConfig.inputData) {
			let item = this.gameConfig.inputData[key];
			if (item === undefined) {
				continue;
			}

			let peekedCharacters = cursor.PeekAhead(key.length);
			if (peekedCharacters == null) {
				continue;
			}

			let isMatch = item.caseInsensitive
				? peekedCharacters.toLowerCase() === key.toLowerCase()
				: peekedCharacters == key;
			if (isMatch && key.length > matchedKey.length) {
				matchedKey = key;
			}
		}

		if (matchedKey === "") {
			return null;
		}

		let consumedCharacters = cursor.ConsumeMultiple(matchedKey.length);
		let inputDataButton = this.gameConfig.inputData[matchedKey];

		if (inputDataButton === undefined) {
			const msg = `Failed to lookup consumed characters ${consumedCharacters} for input ${cursor.ToString()}`;
			throw new Error(msg);
		}

		return inputDataButton;
	}
}
