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

	describe("parseDirectionInputSource", () => {
		// Forward (6)
		it("parses a forward input (6LP)", () => {
			expect(parser.parseLine("6LP")).toEqual([{
				kind: "input", direction: Direction.Forward, button: "LP", delayed: false,
			}]);
		});

		// Down-Forward (3)
		it("parses a down-forward input (3LK)", () => {
			expect(parser.parseLine("3LK")).toEqual([{
				kind: "input", direction: Direction.DownForward, button: "LK", delayed: false,
			}]);
		});

		// Down-Back (1)
		it("parses a down-back input (1LK)", () => {
			expect(parser.parseLine("1LK")).toEqual([{
				kind: "input", direction: Direction.DownBack, button: "LK", delayed: false,
			}]);
		});

		// Up (8)
		it("parses an up input (8HP)", () => {
			expect(parser.parseLine("8HP")).toEqual([{
				kind: "input", direction: Direction.Up, button: "HP", delayed: false,
			}]);
		});

		// Up-Forward (9)
		it("parses a jump forward input (9HP)", () => {
			expect(parser.parseLine("9HP")).toEqual([{
				kind: "input", direction: Direction.UpForward, button: "HP", delayed: false,
			}]);
		});

		// Up-Back (7)
		it("parses a jump back input (7HP)", () => {
			expect(parser.parseLine("7HP")).toEqual([{
				kind: "input", direction: Direction.UpBack, button: "HP", delayed: false,
			}]);
		});

	})

	describe("parseSuperSource", () => {
		// SA1 - Double Quarter Circle Forward (e.g. Ryu's Shinku Hadoken)
		it("parses a SA1 super (236236LP)", () => {
			expect(parser.parseLine("236236.LP")).toEqual([{
				kind: "input", direction: Direction.DoubleQuarterCircleForward, button: "LP", delayed: false,
			}]);
		});

		// SA2 - Double Quarter Circle Back (varies by character)
		it("parses a SA2 super (214214LP)", () => {
			expect(parser.parseLine("214214.LP")).toEqual([{
				kind: "input", direction: Direction.DoubleQuarterCircleBack, button: "LP", delayed: false,
			}]);
		});

		// SA3 / Critical Art - OD Super (e.g. 236236KK or 214214KK)
		it("parses an OD SA3 super (236236KK)", () => {
			expect(parser.parseLine("236236.KK")).toEqual([{
				kind: "input", direction: Direction.DoubleQuarterCircleForward, button: "KK", delayed: false,
			}]);
		});

		// SA used as combo ender
		it("parses a full combo ending in SA1", () => {
			expect(parser.parseLine("2.MK > 236.HP > 236236.LP")).toHaveLength(5);
		});
	})

	describe("quarterCircleInputSources", () => {
		it("parses a quarter-circle back input (214LK)", () => {
			expect(parser.parseLine("214.LK")).toEqual([{
				kind: "input", direction: Direction.QuarterCircleBack, button: "LK", delayed: false,
			}]);
		});

		it("parses a QCB input without a dot (214LK)", () => {
			expect(parser.parseLine("214LK")).toEqual([{
				kind: "input", direction: Direction.QuarterCircleBack, button: "LK", delayed: false,
			}]);
		});
	})

	describe("largeCircleInputSources", () => {
		// Half-Circle Back (63214) - command grabs like Zangief SPD
		it("parses a half-circle back input (63214LP)", () => {
			expect(parser.parseLine("63214LP")).toEqual([{
				kind: "input", direction: Direction.HalfCircleBack, button: "LP", delayed: false,
			}]);
		});

		// Half-Circle Forward (41236)
		it("parses a half-circle forward input (41236LK)", () => {
			expect(parser.parseLine("41236LK")).toEqual([{
				kind: "input", direction: Direction.HalfCircleForward, button: "LK", delayed: false,
			}]);
		});

		// 360 (e.g. Zangief SPD)
		// 360+LP
		it("parses a full-circle input (360LP)", () => {
			expect(parser.parseLine("360LP")).toEqual([{
				kind: "input", direction: Direction.FullCircle, button: "LP", delayed: false
			}])
		})
	})


	describe("dragonPunchSources", () => {
		it("parses a reverse DP input (421HP)", () => {
			expect(parser.parseLine("421.HP")).toEqual([{
				kind: "input", direction: Direction.ReverseDragonPunch, button: "HP", delayed: false,
			}]);
		});
	})

	describe("throwNotation", () => {
		// Neutral throw
		it("parses a throw", () => {
			expect(parser.parseLine("THROW")).toEqual([
				{ kind: "input", direction: "5", button: "THROW", delayed: false }, // or whatever the expected token is
			]);
		});

		// Forward throw (walk forward + throw)
		it("parses a forward throw (6Throw)", () => {
			expect(parser.parseLine("6THROW")).toEqual([{
				kind: "input", direction: Direction.Forward, button: "THROW", delayed: false
			}]);
		});

		// Back throw
		it("parses a back throw (4Throw)", () => {
			expect(parser.parseLine("4THROW")).toEqual([{
				kind: "input", direction: Direction.Back, button: "THROW", delayed: false
			}]);
		});

		// Air throw
		it("parses an air throw (j.Throw)", () => {
			expect(parser.parseLine("jTHROW")).toEqual([{
				kind: "input", direction: Direction.Jump, button: "THROW", delayed: false
			}]);
		});
	})

	describe("chargeNotation", () => {
		// Down-charge Up (Chun-Li Hazanshu, Kikoken variants)
		it("parses a down-charge up input ([2]8HP)", () => {
			expect(parser.parseLine("[2]8.HP")).toEqual([{
				kind: "charge-input",
				charge: Direction.Down,
				direction: Direction.Up,
				button: "HP",
			}]);
		});

		// Down-charge Forward (Guile Sonic Boom)
		it("parses a down-back charge forward input ([2]6HP)", () => {
			expect(parser.parseLine("[2]6.HP")).toEqual([{
				kind: "charge-input",
				charge: Direction.Down,
				direction: Direction.Forward,
				button: "HP",
			}]);
		});
	})

	describe("driveRushNotation", () => {
		// Drive Rush cancel mid-combo (the most common SF6 combo structure)
		it("parses a Drive Rush cancel in a combo", () => {
			expect(parser.parseLine("2.MK DRC 5.MP , 236.HP")).toEqual([
				{ kind: "input", direction: Direction.Down, button: "MK", delayed: false },
				{ kind: "badge", button: "DRC" },
				{ kind: "input", direction: Direction.Neutral, button: "MP", delayed: false },
				{ kind: "separator", separator: Separator.Link },
				{ kind: "input", direction: Direction.QuarterCircleForward, button: "HP", delayed: false },
			]);
		});

		// Raw Drive Rush into a normal
		it("parses DR into a normal", () => {
			expect(parser.parseLine("DR 5.HP")).toEqual([
				{ kind: "badge", button: "DR" },
				{ kind: "input", direction: Direction.Neutral, button: "HP", delayed: false },
			]);
		});
	})


	describe("driveImpactNotation", () => {
		it("parses DI as a combo starter with cancel", () => {
			expect(parser.parseLine("DI > 5.HP")).toEqual([
				{ kind: "badge", button: "DI" },
				{ kind: "separator", separator: Separator.Cancel },
				{ kind: "input", direction: Direction.Neutral, button: "HP", delayed: false },
			]);
		});
	})

	describe("punishOrCounterNotation", () => {
		it("parses [CH] as starter in a full combo", () => {
			expect(parser.parseLine("[CH] 5.HP > 236.LP")).toHaveLength(4);
		});

		it("parses [PC] as starter in a full combo", () => {
			expect(parser.parseLine("[PC] 2.HP > 236236.LP")).toHaveLength(4);
		});
	})

	describe("delayedInputNotation", () => {
		it("parses a delayed input", () => {
			expect(parser.parseLine("d.5HP")).toEqual([
				// confirm whatever syntax triggers delayed: true
				{ kind: "input", direction: Direction.Neutral, button: "HP", delayed: true },
			]);
		});
	})

	describe("allSingleButtons", () => {
		// Medium Kick
		it("parses MK button", () => {
			expect(parser.parseLine("5.MK")).toEqual([{
				kind: "input", direction: Direction.Neutral, button: "MK", delayed: false,
			}]);
		});

		// Heavy Kick
		it("parses HK button", () => {
			expect(parser.parseLine("5.HK")).toEqual([{
				kind: "input", direction: Direction.Neutral, button: "HK", delayed: false,
			}]);
		});

		// Light Kick
		it("parses LK button", () => {
			expect(parser.parseLine("5.LK")).toEqual([{
				kind: "input", direction: Direction.Neutral, button: "LK", delayed: false,
			}]);
		});

		// Heavy Punch
		it("parses HP with neutral direction", () => {
			// HP is only tested with non-neutral directions; add neutral case
			expect(parser.parseLine("5.HP")).toEqual([{
				kind: "input", direction: Direction.Neutral, button: "HP", delayed: false,
			}]);
		});
	})


	describe("randomEdgeCases", () => {
		// Empty string
		it("returns empty array for empty string", () => {
			expect(parser.parseLine("")).toEqual([]);
		});

		// Only whitespace
		it("returns empty array for whitespace-only input", () => {
			expect(parser.parseLine("   ")).toEqual([]);
		});

		// Multiple unknown tokens
		it("falls back to raw for each unrecognized token in a sequence", () => {
			expect(parser.parseLine("foo bar")).toEqual([
				{ kind: "raw", value: "foo" },
				{ kind: "raw", value: "bar" },
			]);
		});

		// Consecutive separators (malformed input)
		it("handles consecutive separators gracefully", () => {
			expect(parser.parseLine("> >")).toEqual([
				{ kind: "separator", separator: Separator.Cancel },
				{ kind: "separator", separator: Separator.Cancel },
			]);
		});

		// Mixed known and unknown tokens
		it("handles a mix of valid and raw tokens", () => {
			expect(parser.parseLine("5.LP foobar 236.HP")).toEqual([
				{ kind: "input", direction: Direction.Neutral, button: "LP", delayed: false },
				{ kind: "raw", value: "foobar" },
				{ kind: "input", direction: Direction.QuarterCircleForward, button: "HP", delayed: false },
			]);
		});

		// Windows-style line endings
		it("handles CRLF line endings", () => {
			const result = parser.parseFgSource("5.LP\r\n5.HP");
			expect(result).toHaveLength(2);
		});

		// Single line with no newline
		it("handles a single line with no trailing newline", () => {
			const result = parser.parseFgSource("236.HP");
			expect(result).toHaveLength(1);
		});

		// Three or more lines
		it("parses three combo lines", () => {
			const result = parser.parseFgSource("5.LP\n5.MP\n5.HP");
			expect(result).toHaveLength(3);
		});

		// Line that is only whitespace treated as blank
		it("treats tab-only lines as blank", () => {
			const result = parser.parseFgSource("5.LP\n\t\n5.HP");
			expect(result).toHaveLength(2);
		});
	})
});
