import { describe, it, expect } from "vitest";
import { Cursor } from "./cursor";
import { DigitRecognizer } from "./recognizers/digit-recognizer";
import { MotionRecognizer } from "./recognizers/motion-recognizer";
import { SF6_CONFIG } from "./games/sf6";
import { ButtonRecognizer } from "./recognizers/button-recognizer";

describe("CursorTests", () => {
	describe("peek", () => {
		it("peek at end, returns null", () => {
			let cursor = new Cursor("");
			expect(cursor.Peek()).toEqual(null);
		});

		it("peek returns first character", () => {
			let cursor = new Cursor("test");
			expect(cursor.Peek()).toEqual("t");
		});

		it("consume, then peek returns second character", () => {
			let cursor = new Cursor("test");
			cursor.Consume();
			expect(cursor.Peek()).toEqual("e");
		});

		it("consume, then AtEnd returns true", () => {
			let cursor = new Cursor("t");
			cursor.Consume();
			expect(cursor.AtEnd()).toEqual(true);
		});
	});

	describe("peekAhead", () => {
		it("peekAhead full string, returns full string", () => {
			let cursor = new Cursor("test");
			expect(cursor.PeekAhead(4)).toEqual("test");
		});
	});

	describe("digitRecognizer", () => {
		it("digit recognizer, with digit returns digit and consumes", () => {
			let cursor = new Cursor("3");
			let digitRecognizer = new DigitRecognizer();
			expect(digitRecognizer.RecognizeDigit(cursor)).toEqual("3");

			expect(cursor.GetCurrentPosition()).toEqual(1);
		});

		it("digit recognizer, non digit returns null and does not consume", () => {
			let cursor = new Cursor("a");
			let digitRecognizer = new DigitRecognizer();
			expect(digitRecognizer.RecognizeDigit(cursor)).toEqual(null);

			expect(cursor.GetCurrentPosition()).toEqual(0);
		});
	});

	describe("motionRecognizer", () => {
		it("motion input recognizer, with series of digits returns digits and consumes", () => {
			let cursor = new Cursor("236");
			let motionRecognizer = new MotionRecognizer();
			expect(motionRecognizer.RecognizeMotion(cursor)).toEqual({
				recognizedDirection: "236",
				tigerKneeDirection: null,
			});

			expect(cursor.GetCurrentPosition()).toEqual(3);
		});

		it("motion input recognizer, with series of digits returns digits and consumes, ends at non-digit", () => {
			let cursor = new Cursor("236A");
			let motionRecognizer = new MotionRecognizer();
			expect(motionRecognizer.RecognizeMotion(cursor)).toEqual({
				recognizedDirection: "236",
				tigerKneeDirection: null,
			});

			expect(cursor.GetCurrentPosition()).toEqual(3);
		});

		it("motion input recognizer, non-motion returns null and does not advance", () => {
			let cursor = new Cursor("ASDF");
			let motionRecognizer = new MotionRecognizer();
			expect(motionRecognizer.RecognizeMotion(cursor)).toEqual(null);

			expect(cursor.GetCurrentPosition()).toEqual(0);
		});
	});

	describe("buttonRecognizer", () => {
		it("button recognizer, with button, returns", () => {
			let gameConfig = SF6_CONFIG;
			let cursor = new Cursor("LP");
			let buttonRecognizer = new ButtonRecognizer(gameConfig);

			let recognizedButton = buttonRecognizer.RecognizeButton(cursor);

			expect(recognizedButton?.label).toEqual("LP");
			expect(cursor.GetCurrentPosition()).toEqual(2);
		});

		it("button recognizer, with ambiguous button, returns correct button", () => {
			// Case where we have PPP, could match PPP or PP, want to ensure we get PPP
			let gameConfig = SF6_CONFIG;
			let cursor = new Cursor("PPP");
			let buttonRecognizer = new ButtonRecognizer(gameConfig);

			let recognizedButton = buttonRecognizer.RecognizeButton(cursor);

			expect(recognizedButton?.label).toEqual("PPP");
			expect(cursor.GetCurrentPosition()).toEqual(3);
		});

		it("button recognizer, with button and extra char, only returns button", () => {
			let gameConfig = SF6_CONFIG;
			let cursor = new Cursor("LPX");
			let buttonRecognizer = new ButtonRecognizer(gameConfig);

			let recognizedButton = buttonRecognizer.RecognizeButton(cursor);

			expect(recognizedButton?.label).toEqual("LP");
			expect(cursor.GetCurrentPosition()).toEqual(2);
		});

		it("button recognizer, with empty input, returns null", () => {
			let gameConfig = SF6_CONFIG;
			let cursor = new Cursor("");
			let buttonRecognizer = new ButtonRecognizer(gameConfig);

			let recognizedButton = buttonRecognizer.RecognizeButton(cursor);

			expect(recognizedButton).toEqual(null);
		});
	});
});
