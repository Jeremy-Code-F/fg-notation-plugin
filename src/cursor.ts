export class Cursor {
	endOfInput: null = null;
	private input: string;
	private currentPosition: number = 0;
	constructor(input: string) {
		this.input = input;
	}

	ToString() {
		return this.input.toString();
	}

	GetCurrentPosition(): number {
		return this.currentPosition;
	}

	Peek(): string | null {
		if (this.AtEnd()) {
			return this.endOfInput;
		}

		let currentCharacter: string | undefined | null =
			this.input[this.currentPosition];

		if (currentCharacter === undefined) {
			let msg = `Attempted to peek but no character could be read at position ${this.currentPosition} in input '${this.input}'`;
			console.warn(msg);
			throw new Error(msg);
		}

		return currentCharacter;
	}

	PeekAhead(n: number): string | null {
		if (this.AtEnd()) {
			return this.endOfInput;
		}

		let peekedCharacters: string = this.input.slice(
			this.currentPosition,
			this.currentPosition + n,
		);

		return peekedCharacters;
	}

	Consume(): string {
		let currentChar = this.Peek();
		if (currentChar === this.endOfInput) {
			throw new Error(
				`Attempted to consume but we are at the end of the input`,
			);
		}

		this.currentPosition += 1;

		return currentChar;
	}

	ConsumeMultiple(n: number): string {
		let characters: string[] = [];
		for (let i = 0; i < n; i++) {
			let character = this.Consume();
			characters.push(character);
		}

		return characters.join("");
	}

	AtEnd(): boolean {
		if (this.currentPosition >= this.input.length) {
			return true;
		}
		return false;
	}
}
