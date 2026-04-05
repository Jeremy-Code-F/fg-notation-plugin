import { describe, it, expect } from "vitest";
import { FgParser } from "./fg-parser";
import { Direction, Separator } from "types";
import type { ChargeInputToken } from "types";
import { SF6_CONFIG } from "./games/sf6";

describe("FgParser", () => {
	const parser = new FgParser(SF6_CONFIG);

	describe("parseLine", () => {
		it("parses a single numpad input", () => {
			expect(parser.parseLine("5.LP")).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "LP",
					delayed: false,
				},
			]);
		});

		it("parses a neutral input without a dot (5LP)", () => {
			expect(parser.parseLine("5LP")).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "LP",
					delayed: false,
				},
			]);
		});

		it("parses a neutral input with no direction or dot (LP)", () => {
			expect(parser.parseLine("LP")).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "LP",
					delayed: false,
				},
			]);
		});

		it("parses a non-neutral input without a dot (2LP)", () => {
			expect(parser.parseLine("2LP")).toEqual([
				{
					kind: "input",
					direction: Direction.Down,
					button: "LP",
					delayed: false,
				},
			]);
		});

		it("parses a motion input without a dot (236LP)", () => {
			expect(parser.parseLine("236LP")).toEqual([
				{
					kind: "input",
					direction: Direction.QuarterCircleForward,
					button: "LP",
					delayed: false,
				},
			]);
		});

		it("parses a motion input", () => {
			expect(parser.parseLine("236.LP")).toEqual([
				{
					kind: "input",
					direction: Direction.QuarterCircleForward,
					button: "LP",
					delayed: false,
				},
			]);
		});

		it("parses a jump input", () => {
			expect(parser.parseLine("j.HP")).toEqual([
				{
					kind: "input",
					direction: Direction.Jump,
					button: "HP",
					delayed: false,
				},
			]);
		});

		it("parses a cancel separator", () => {
			expect(parser.parseLine(">")).toEqual([
				{ kind: "separator", separator: Separator.Cancel },
			]);
		});

		it("parses a chain separator", () => {
			expect(parser.parseLine("~")).toEqual([
				{ kind: "separator", separator: Separator.Chain },
			]);
		});

		it("parses a link separator", () => {
			expect(parser.parseLine(",")).toEqual([
				{ kind: "separator", separator: Separator.Link },
			]);
		});

		it("parses a counter hit badge", () => {
			expect(parser.parseLine("[CH]")).toEqual([
				{ kind: "badge", button: "CH" },
			]);
		});

		it("parses a punish counter badge", () => {
			expect(parser.parseLine("[PC]")).toEqual([
				{ kind: "badge", button: "PC" },
			]);
		});

		it("parses DRC as a badge", () => {
			expect(parser.parseLine("DRC")).toEqual([
				{ kind: "badge", button: "DRC" },
			]);
		});

		it("parses DR as a badge", () => {
			expect(parser.parseLine("DR")).toEqual([
				{ kind: "badge", button: "DR" },
			]);
		});

		it("parses DI as a badge", () => {
			expect(parser.parseLine("DI")).toEqual([
				{ kind: "badge", button: "DI" },
			]);
		});

		it("parses an EX move with PP", () => {
			expect(parser.parseLine("236.PP")).toEqual([
				{
					kind: "input",
					direction: Direction.QuarterCircleForward,
					button: "PP",
					delayed: false,
				},
			]);
		});

		it("parses an EX move with KK", () => {
			expect(parser.parseLine("623.KK")).toEqual([
				{
					kind: "input",
					direction: Direction.DragonPunch,
					button: "KK",
					delayed: false,
				},
			]);
		});

		it("parses an EX move with PPP", () => {
			expect(parser.parseLine("236.PPP")).toEqual([
				{
					kind: "input",
					direction: Direction.QuarterCircleForward,
					button: "PPP",
					delayed: false,
				},
			]);
		});

		it("parses an EX move with KKK", () => {
			expect(parser.parseLine("236.KKK")).toEqual([
				{
					kind: "input",
					direction: Direction.QuarterCircleForward,
					button: "KKK",
					delayed: false,
				},
			]);
		});

		it("parses a charge input", () => {
			expect(parser.parseLine("[4]6.HP")).toEqual([
				{
					kind: "charge-input",
					charge: Direction.Back,
					direction: Direction.Forward,
					button: "HP",
				} satisfies ChargeInputToken,
			]);
		});

		it("parses a full combo with a charge input", () => {
			expect(parser.parseLine("5.MP ~ 4.HP > [4]6.HP")).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "MP",
					delayed: false,
				},
				{ kind: "separator", separator: Separator.Chain },
				{
					kind: "input",
					direction: Direction.Back,
					button: "HP",
					delayed: false,
				},
				{ kind: "separator", separator: Separator.Cancel },
				{
					kind: "charge-input",
					charge: Direction.Back,
					direction: Direction.Forward,
					button: "HP",
				} satisfies ChargeInputToken,
			]);
		});

		it("falls back to raw token for unrecognized input", () => {
			expect(parser.parseLine("foobar")).toEqual([
				{ kind: "raw", value: "foobar" },
			]);
		});

		it("parses a full combo line", () => {
			expect(parser.parseLine("236.HP > 5.MP ~ 5.LP")).toEqual([
				{
					kind: "input",
					direction: Direction.QuarterCircleForward,
					button: "HP",
					delayed: false,
				},
				{ kind: "separator", separator: Separator.Cancel },
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "MP",
					delayed: false,
				},
				{ kind: "separator", separator: Separator.Chain },
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "LP",
					delayed: false,
				},
			]);
		});

		it("ignores extra whitespace between tokens", () => {
			expect(parser.parseLine("5.LP   >   5.HP")).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "LP",
					delayed: false,
				},
				{ kind: "separator", separator: Separator.Cancel },
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "HP",
					delayed: false,
				},
			]);
		});
	});

	describe("parseFgSource", () => {
		it("splits source into multiple lines", () => {
			const result = parser.parseFgSource("5.LP\n5.HP");
			expect(result).toHaveLength(2);
			expect(result[0]).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "LP",
					delayed: false,
				},
			]);
			expect(result[1]).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: "HP",
					delayed: false,
				},
			]);
		});

		it("filters out blank lines", () => {
			const result = parser.parseFgSource("5.LP\n\n   \n5.HP");
			expect(result).toHaveLength(2);
		});

		it("trims whitespace from each line", () => {
			const result = parser.parseFgSource("  5.LP  ");
			expect(result).toEqual([
				[
					{
						kind: "input",
						direction: Direction.Neutral,
						button: "LP",
						delayed: false,
					},
				],
			]);
		});
	});
});
