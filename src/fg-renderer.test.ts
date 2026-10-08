import { describe, it, expect } from "vitest";
import { Direction, processFgBlock, renderFgNotation } from "./fg-renderer";
import { createIconProvider } from "./icon-provider";
import { SF6_CONFIG } from "./games/sf6";

describe("processFgBlock", () => {
	it("renders an LP input as a button icon", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("LP", el, icons, SF6_CONFIG);

		expect(el.hasClass("fg-notation-block")).toBe(true);

		const button = el.querySelector(".fg-button--lp");
		expect(button).not.toBeNull();
		expect(button?.querySelector("svg")).not.toBeNull();
	});

	it("renders the button inside its input wrapper alongside the direction", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("236.LP", el, icons, SF6_CONFIG);

		const line = el.querySelector(".fg-line")!;
		expect(line.children).toHaveLength(1);

		const input = line.children[0]!;
		expect(input.hasClass("fg-input")).toBe(true);
		expect(input.querySelector(".fg-direction.fg-arrows")).not.toBeNull();
		expect(input.querySelector(".fg-button--lp")).not.toBeNull();
	});

	it("renders a super badge inside its input wrapper", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("SA1", el, icons, SF6_CONFIG);

		const line = el.querySelector(".fg-line")!;
		expect(line.children).toHaveLength(1);
		expect(
			line.children[0]!.querySelector(".fg-badge--sa1"),
		).not.toBeNull();
	});

	it("renders a standalone dash as arrows", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("66", el, icons, SF6_CONFIG);

		const dash = el.querySelector(".fg-dash");
		expect(dash).not.toBeNull();
		expect(dash?.querySelector(".fg-arrows")?.textContent).toBe("→→");
		expect(el.querySelector(".fg-raw")).toBeNull();
	});

	it("renders an air dash with a JUMP badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("j.44", el, icons, SF6_CONFIG);

		const dash = el.querySelector(".fg-dash");
		expect(dash?.querySelector(".fg-badge--jump")).not.toBeNull();
		expect(dash?.querySelector(".fg-arrows")?.textContent).toBe("←←");
	});

	it("renders a microwalk as a MICROWALK badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("microwalk 5MP", el, icons, SF6_CONFIG);

		const badge = el.querySelector(".fg-badge--microwalk");
		expect(badge).not.toBeNull();
		expect(badge?.textContent).toBe("MICROWALK");
		expect(el.querySelector(".fg-raw")).toBeNull();
		expect(el.querySelector(".fg-button--mp")).not.toBeNull();
	});

	it("renders a jump input with a JUMP badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("j.HP", el, icons, SF6_CONFIG);

		const badge = el.querySelector(".fg-badge--jump");
		expect(badge).not.toBeNull();
		expect(badge?.textContent).toBe("JUMP");

		expect(el.querySelector(".fg-button--hp")).not.toBeNull();
	});

	it("renders a delayed input with a DELAY badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("d.HP", el, icons, SF6_CONFIG);

		const badge = el.querySelector(".fg-badge--delay");
		expect(badge).not.toBeNull();
		expect(badge?.textContent).toBe("DELAY");
		expect(el.querySelector(".fg-badge--undefined")).toBeNull();

		expect(el.querySelector(".fg-button--hp")).not.toBeNull();
	});

	it("renders a SA1 input with a SA1 badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("SA1", el, icons, SF6_CONFIG);

		const badge = el.querySelector(".fg-badge--sa1");
		expect(badge).not.toBeNull();
		expect(badge?.textContent).toBe("Super Art 1");
	});

	it("renders a SA2 input with a SA2 badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("SA2", el, icons, SF6_CONFIG);

		const badge = el.querySelector(".fg-badge--sa2");
		expect(badge).not.toBeNull();
		expect(badge?.textContent).toBe("Super Art 2");
	});

	it("renders a SA3 input with a SA3 badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("SA3", el, icons, SF6_CONFIG);

		const badge = el.querySelector(".fg-badge--sa3");
		expect(badge).not.toBeNull();
		expect(badge?.textContent).toBe("Super Art 3");
	});

	it("renders a Counter hit modifier with a badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("[CH]", el, icons, SF6_CONFIG);

		const badge = el.querySelector(".fg-badge--ch");
		expect(badge).not.toBeNull();
		expect(badge?.textContent).toBe("CH");
	});

	describe("driveSystemNotation", () => {
		it("renders a Drive Rush cancel badge in a combo", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("2.MK DRC 5.MP , 236.HP", el, icons, SF6_CONFIG);

			const badge = el.querySelector(".fg-badge--drc");
			expect(badge).not.toBeNull();
			expect(badge?.textContent).toBe("DRC");

			const children = Array.from(el.querySelector(".fg-line")!.children);
			expect(children).toHaveLength(5);
			expect(children[0]!.hasClass("fg-input")).toBe(true);
			expect(children[1]).toBe(badge);
			expect(children[2]!.hasClass("fg-input")).toBe(true);
			expect(children[3]!.hasClass("fg-separator--link")).toBe(true);
			expect(children[4]!.hasClass("fg-input")).toBe(true);

			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders a Drive Rush badge before a normal", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("DR 5.HP", el, icons, SF6_CONFIG);

			const badge = el.querySelector(".fg-badge--dr");
			expect(badge).not.toBeNull();
			expect(badge?.textContent).toBe("DR");

			const children = Array.from(el.querySelector(".fg-line")!.children);
			expect(children).toHaveLength(2);
			expect(children[0]).toBe(badge);
			expect(children[1]!.querySelector(".fg-button--hp")).not.toBeNull();

			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders a Drive Impact badge as a combo starter", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("DI > 5.HP", el, icons, SF6_CONFIG);

			const badge = el.querySelector(".fg-badge--di");
			expect(badge).not.toBeNull();
			expect(badge?.textContent).toBe("DI");

			const children = Array.from(el.querySelector(".fg-line")!.children);
			expect(children).toHaveLength(3);
			expect(children[0]).toBe(badge);
			expect(children[1]!.hasClass("fg-separator--cancel")).toBe(true);
			expect(children[2]!.querySelector(".fg-button--hp")).not.toBeNull();

			expect(el.querySelector(".fg-raw")).toBeNull();
		});
	});

	describe("tigerKneeCases", () => {
		it("appends the tiger knee direction arrow onto the motion for tk. shorthand notation", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("tk.236.LP", el, icons, SF6_CONFIG);

			expect(el.querySelector(".fg-badge--tk")).toBeNull();

			const arrows = el.querySelector(".fg-direction.fg-arrows");
			expect(arrows?.textContent).toBe("↓↘→↗");

			expect(el.querySelector(".fg-button--lp")).not.toBeNull();
		});

		it("appends the tiger knee direction arrow onto the motion for numpad notation", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("2369.LP", el, icons, SF6_CONFIG);

			expect(el.querySelector(".fg-badge--tk")).toBeNull();

			const arrows = el.querySelector(".fg-direction.fg-arrows");
			expect(arrows?.textContent).toBe("↓↘→↗");
		});

		it("does not append an extra arrow or badge for a plain motion input", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("236.LP", el, icons, SF6_CONFIG);

			expect(el.querySelector(".fg-badge--tk")).toBeNull();

			const arrows = el.querySelector(".fg-direction.fg-arrows");
			expect(arrows?.textContent).toBe("↓↘→");
		});
	});

	describe("grapplerInputSources", () => {
		it("parses a combo with 360 input in it", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("5.LP > 5.MP > 360.PP", el, icons, SF6_CONFIG);

			const inputs = el.querySelectorAll(".fg-input");
			expect(inputs).toHaveLength(3);
			expect(
				inputs[0]!.querySelector(".fg-direction.fg-arrows"),
			).toBeNull();
			expect(
				inputs[1]!.querySelector(".fg-direction.fg-arrows"),
			).toBeNull();
			expect(
				inputs[2]!.querySelector(".fg-direction.fg-arrows")
					?.textContent,
			).toBe("→↘↓↙←↖↑");

			const buttons = el.querySelectorAll(".fg-button");
			expect(buttons).toHaveLength(3);
			expect(buttons[0]!.hasClass("fg-button--lp")).toBe(true);
			expect(buttons[1]!.hasClass("fg-button--mp")).toBe(true);
			expect(buttons[2]!.hasClass("fg-button--pp")).toBe(true);

			const separators = el.querySelectorAll(".fg-separator");
			expect(separators).toHaveLength(2);
			expect(separators[0]!.hasClass("fg-separator--cancel")).toBe(true);
			expect(separators[1]!.hasClass("fg-separator--cancel")).toBe(true);
		});

		it("renders a jump throw input", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("j.THROW", el, icons, SF6_CONFIG);

			const jumpBadge = el.querySelector(".fg-badge--jump");
			expect(jumpBadge).not.toBeNull();
			expect(jumpBadge?.textContent).toBe("JUMP");

			const throwBadge = el.querySelector(".fg-badge--throw");
			expect(throwBadge).not.toBeNull();
			expect(throwBadge?.textContent).toBe("THROW");
		});

		it("renders a full 720 input", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("720LP", el, icons, SF6_CONFIG);

			const arrows = el.querySelector(".fg-direction.fg-arrows");
			expect(arrows?.textContent).toBe("→↘↓↙←↖↑→↘↓↙←↖↑");

			expect(el.querySelector(".fg-button--lp")).not.toBeNull();
		});

		it("renders a full 360 input", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("360LP", el, icons, SF6_CONFIG);

			const arrows = el.querySelector(".fg-direction.fg-arrows");
			expect(arrows?.textContent).toBe("→↘↓↙←↖↑");

			expect(el.querySelector(".fg-button--lp")).not.toBeNull();
		});

		it("renders a jump 360 input with a JUMP badge", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("j.360KK", el, icons, SF6_CONFIG);

			const badge = el.querySelector(".fg-badge--jump");
			expect(badge).not.toBeNull();

			const arrows = el.querySelector(".fg-direction.fg-arrows");
			expect(arrows?.textContent).toBe("→↘↓↙←↖↑");

			expect(el.querySelector(".fg-button--kk")).not.toBeNull();
		});

		it("appends the tiger knee direction arrow onto a 360 input", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("tk.360KK", el, icons, SF6_CONFIG);

			const arrows = el.querySelector(".fg-direction.fg-arrows");
			expect(arrows?.textContent).toBe("→↘↓↙←↖↑↑");
		});
	});

	it("renders close and far inputs with CLOSE and FAR badges", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("c.HP > f.HP", el, icons, SF6_CONFIG);

		const inputs = el.querySelectorAll(".fg-input");
		expect(inputs).toHaveLength(2);
		expect(inputs[0]!.querySelector(".fg-badge--close")?.textContent).toBe(
			"CLOSE",
		);
		expect(inputs[1]!.querySelector(".fg-badge--far")?.textContent).toBe(
			"FAR",
		);
		expect(el.querySelector(".fg-raw")).toBeNull();
	});

	describe("directionBadges", () => {
		it.each([
			[Direction.Close, "close", "CLOSE"],
			[Direction.Far, "far", "FAR"],
			[Direction.Jump, "jump", "JUMP"],
		])(
			"renders a %s direction as a badge",
			(direction, cssClass, label) => {
				const el = document.createElement("div");
				const icons = createIconProvider(SF6_CONFIG.inputData);

				renderFgNotation(
					[
						[
							{
								kind: "input",
								direction,
								button: "HP",
								buttonData: SF6_CONFIG.inputData["HP"]!,
							},
						],
					],
					el,
					icons,
				);

				const badge = el.querySelector(`.fg-badge--${cssClass}`);
				expect(badge).not.toBeNull();
				expect(badge?.textContent).toBe(label);
				expect(el.querySelector(".fg-badge--undefined")).toBeNull();

				expect(el.querySelector(".fg-button--hp")).not.toBeNull();
			},
		);
	});

	describe("chargeInputs", () => {
		it("renders the charge direction and release direction for [4]6HP", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("[4]6HP", el, icons, SF6_CONFIG);

			const line = el.querySelector(".fg-line")!;
			expect(line.children).toHaveLength(1);

			const input = line.children[0]!;
			expect(input.hasClass("fg-input")).toBe(true);

			const arrows = input.querySelectorAll(".fg-arrows");
			expect(arrows).toHaveLength(2);
			expect(arrows[0]!.hasClass("fg-charge")).toBe(true);
			expect(arrows[0]!.textContent).toBe("←");
			expect(arrows[1]!.hasClass("fg-charge")).toBe(false);
			expect(arrows[1]!.textContent).toBe("→");

			expect(input.querySelector(".fg-button--hp")).not.toBeNull();
			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders a down-charge into an up release for [2]8KK", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("[2]8KK", el, icons, SF6_CONFIG);

			expect(el.querySelector(".fg-charge.fg-arrows")?.textContent).toBe(
				"↓",
			);
			const arrows = el.querySelectorAll(".fg-arrows");
			expect(arrows[1]?.textContent).toBe("↑");
			expect(el.querySelector(".fg-button--kk")).not.toBeNull();
			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders a charge input inside a combo", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("2LP > [4]6HP", el, icons, SF6_CONFIG);

			const children = Array.from(el.querySelector(".fg-line")!.children);
			expect(children).toHaveLength(3);
			expect(children[0]!.querySelector(".fg-button--lp")).not.toBeNull();
			expect(children[1]!.hasClass("fg-separator--cancel")).toBe(true);
			expect(children[2]!.querySelector(".fg-charge")).not.toBeNull();
			expect(children[2]!.querySelector(".fg-button--hp")).not.toBeNull();
		});
	});

	describe("separators", () => {
		it.each([
			[">", "cancel"],
			[",", "link"],
			["~", "chain"],
			["+", "together"],
		])(
			"renders the '%s' separator as a %s icon",
			(symbol, cssClass) => {
				const el = document.createElement("div");
				const icons = createIconProvider(SF6_CONFIG.inputData);

				processFgBlock(`5LP ${symbol} 5MP`, el, icons, SF6_CONFIG);

				const children = Array.from(
					el.querySelector(".fg-line")!.children,
				);
				expect(children).toHaveLength(3);

				const separator = children[1]!;
				expect(separator.hasClass("fg-separator")).toBe(true);
				expect(separator.hasClass(`fg-separator--${cssClass}`)).toBe(
					true,
				);
				expect(separator.querySelector("svg")).not.toBeNull();
				expect(el.querySelector(".fg-raw")).toBeNull();
			},
		);

		it("renders the '/' separator as OR text", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("5LP / 2LP", el, icons, SF6_CONFIG);

			const children = Array.from(el.querySelector(".fg-line")!.children);
			expect(children).toHaveLength(3);

			const separator = children[1]!;
			expect(separator.hasClass("fg-separator--or")).toBe(true);
			expect(separator.textContent).toBe("OR");
			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders a together separator with no surrounding spaces (LP+LK)", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("LP+LK", el, icons, SF6_CONFIG);

			const children = Array.from(el.querySelector(".fg-line")!.children);
			expect(children).toHaveLength(3);
			expect(children[0]!.querySelector(".fg-button--lp")).not.toBeNull();
			expect(children[1]!.hasClass("fg-separator--together")).toBe(true);
			expect(children[2]!.querySelector(".fg-button--lk")).not.toBeNull();
		});
	});

	describe("standaloneBadges", () => {
		it("renders a WALLSPLAT badge", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("WALLSPLAT", el, icons, SF6_CONFIG);

			const badge = el.querySelector(".fg-badge--wallsplat");
			expect(badge).not.toBeNull();
			expect(badge?.textContent).toBe("WALLSPLAT");
			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders a WALLSPLAT badge between inputs in a combo", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("236HP WALLSPLAT 5HP", el, icons, SF6_CONFIG);

			const children = Array.from(el.querySelector(".fg-line")!.children);
			expect(children).toHaveLength(3);
			expect(children[0]!.hasClass("fg-input")).toBe(true);
			expect(children[1]!.hasClass("fg-badge--wallsplat")).toBe(true);
			expect(children[2]!.hasClass("fg-input")).toBe(true);
		});
	});

	describe("bracketedModifiers", () => {
		it("renders a Punish Counter modifier with a badge", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("[PC]", el, icons, SF6_CONFIG);

			const badge = el.querySelector(".fg-badge--pc");
			expect(badge).not.toBeNull();
			expect(badge?.textContent).toBe("PC");
			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders a Punish Counter modifier before an input", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("[PC] 5HP", el, icons, SF6_CONFIG);

			const children = Array.from(el.querySelector(".fg-line")!.children);
			expect(children).toHaveLength(2);
			expect(children[0]!.hasClass("fg-badge--pc")).toBe(true);
			expect(children[1]!.querySelector(".fg-button--hp")).not.toBeNull();
		});
	});

	describe("multiButtonInputs", () => {
		it.each([
			["PPP", "ppp"],
			["KKK", "kkk"],
		])("renders %s as a single button with three icons", (input, cssClass) => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock(`236${input}`, el, icons, SF6_CONFIG);

			const buttons = el.querySelectorAll(".fg-button");
			expect(buttons).toHaveLength(1);
			expect(buttons[0]!.hasClass(`fg-button--${cssClass}`)).toBe(true);
			expect(buttons[0]!.querySelectorAll("svg")).toHaveLength(3);

			expect(el.querySelector(".fg-direction.fg-arrows")?.textContent).toBe(
				"↓↘→",
			);
			expect(el.querySelector(".fg-raw")).toBeNull();
		});
	});

	describe("jumpMotionInputs", () => {
		it("renders j.236LP with a JUMP badge, motion arrows and button", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("j.236LP", el, icons, SF6_CONFIG);

			const line = el.querySelector(".fg-line")!;
			expect(line.children).toHaveLength(1);

			const input = line.children[0]!;
			expect(input.querySelector(".fg-badge--jump")?.textContent).toBe(
				"JUMP",
			);
			expect(
				input.querySelector(".fg-direction.fg-arrows")?.textContent,
			).toBe("↓↘→");
			expect(input.querySelector(".fg-button--lp")).not.toBeNull();
			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders j.214.HK with a dot between motion and button", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("j.214.HK", el, icons, SF6_CONFIG);

			expect(el.querySelector(".fg-badge--jump")).not.toBeNull();
			expect(el.querySelector(".fg-direction.fg-arrows")?.textContent).toBe(
				"↓↙←",
			);
			expect(el.querySelector(".fg-button--hk")).not.toBeNull();
		});
	});

	describe("multiTokenLines", () => {
		it("renders a full combo with modifiers, charge, drive rush and a super", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock(
				"[PC] j.HP , 2MP > DRC 5HP > [4]6HP > 236236PPP ~ SA3",
				el,
				icons,
				SF6_CONFIG,
			);

			const children = Array.from(el.querySelector(".fg-line")!.children);
			const shape = children.map((child) => {
				if (child.hasClass("fg-separator")) return "separator";
				if (child.hasClass("fg-badge")) return "badge";
				if (child.hasClass("fg-input")) return "input";
				return "other";
			});

			expect(shape).toEqual([
				"badge", // [PC]
				"input", // j.HP
				"separator", // ,
				"input", // 2MP
				"separator", // >
				"badge", // DRC
				"input", // 5HP
				"separator", // >
				"input", // [4]6HP
				"separator", // >
				"input", // 236236PPP
				"separator", // ~
				"input", // SA3
			]);
			expect(el.querySelector(".fg-raw")).toBeNull();
		});

		it("renders each source line as its own .fg-line", () => {
			const el = document.createElement("div");
			const icons = createIconProvider(SF6_CONFIG.inputData);

			processFgBlock("2LP > 2LP\n\n5MP > 236HP", el, icons, SF6_CONFIG);

			const lines = el.querySelectorAll(".fg-line");
			expect(lines).toHaveLength(2);
			expect(lines[0]!.querySelectorAll(".fg-input")).toHaveLength(2);
			expect(lines[1]!.querySelectorAll(".fg-input")).toHaveLength(2);
		});
	});
});
