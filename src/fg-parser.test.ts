import { describe, it, expect } from "vitest";
import { FgParser } from "./fg-parser";
import { Button, Direction, Separator } from "types";

describe("FgParser", () => {
	const parser = new FgParser();

	describe("parseLine", () => {
		it("parses a single numpad input", () => {
			expect(parser.parseLine("5.LP")).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: Button.LightPunch,
				},
			]);
		});

		it("parses a motion input", () => {
			expect(parser.parseLine("236.LP")).toEqual([
				{
					kind: "input",
					direction: Direction.QuarterCircleForward,
					button: Button.LightPunch,
				},
			]);
		});

		it("parses a jump input", () => {
			expect(parser.parseLine("j.HP")).toEqual([
				{
					kind: "input",
					direction: Direction.Jump,
					button: Button.HeavyPunch,
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
				{ kind: "badge", button: Button.CounterHit },
			]);
		});

		it("parses a punish counter badge", () => {
			expect(parser.parseLine("[PC]")).toEqual([
				{ kind: "badge", button: Button.PunishCounter },
			]);
		});

		it("parses DRC as a badge", () => {
			expect(parser.parseLine("DRC")).toEqual([
				{ kind: "badge", button: Button.DriveRushCancel },
			]);
		});

		it("parses DR as a badge", () => {
			expect(parser.parseLine("DR")).toEqual([
				{ kind: "badge", button: Button.DriveRush },
			]);
		});

		it("parses DI as a badge", () => {
			expect(parser.parseLine("DI")).toEqual([
				{ kind: "badge", button: Button.DriveImpact },
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
					button: Button.HeavyPunch,
				},
				{ kind: "separator", separator: Separator.Cancel },
				{
					kind: "input",
					direction: Direction.Neutral,
					button: Button.MediumPunch,
				},
				{ kind: "separator", separator: Separator.Chain },
				{
					kind: "input",
					direction: Direction.Neutral,
					button: Button.LightPunch,
				},
			]);
		});

		it("ignores extra whitespace between tokens", () => {
			expect(parser.parseLine("5.LP   >   5.HP")).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: Button.LightPunch,
				},
				{ kind: "separator", separator: Separator.Cancel },
				{
					kind: "input",
					direction: Direction.Neutral,
					button: Button.HeavyPunch,
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
					button: Button.LightPunch,
				},
			]);
			expect(result[1]).toEqual([
				{
					kind: "input",
					direction: Direction.Neutral,
					button: Button.HeavyPunch,
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
						button: Button.LightPunch,
					},
				],
			]);
		});
	});
});
