import { GameConfig } from "game-config";
import { Cursor } from "cursor";
import { ButtonData, ButtonType } from "symbol-data";

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

			if (item.buttonType !== ButtonType.Normal) {
				continue;
			}

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
		let inputDataButton = this.gameConfig.inputData[consumedCharacters];

		if (inputDataButton === undefined) {
			const msg = `Failed to lookup consumed characters ${consumedCharacters} for input ${cursor.ToString()}`;
			console.warn(msg);
			throw new Error(msg);
		}

		return inputDataButton;
	}
}
