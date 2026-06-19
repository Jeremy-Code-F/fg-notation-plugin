import { Cursor } from "cursor";
import { GameConfig } from "game-config";
import { ButtonData, ButtonType } from "symbol-data";

export class ModifierRecognizer {
	private gameConfig: GameConfig;

	constructor(gameConfig: GameConfig) {
		this.gameConfig = gameConfig;
	}

	RecognizeModifier(cursor: Cursor): ButtonData | null {
		let matchedKey = "";
		for (const key in this.gameConfig.modifierData) {
			let modifier = this.gameConfig.modifierData[key];
			if (modifier === undefined) {
				continue;
			}
			if (modifier.buttonType !== ButtonType.Modifier) {
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
		let inputDataButton = this.gameConfig.modifierData[consumedCharacters];

		if (inputDataButton === undefined) {
			const msg = `Failed to lookup consumed characters '${consumedCharacters}' for input '${cursor.ToString()}'`;
			console.warn(msg);
			throw new Error(msg);
		}

		return inputDataButton;
	}
}
