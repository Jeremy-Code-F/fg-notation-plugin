import { describe, it, expect } from "vitest";
import { processFgBlock } from "./fg-renderer";
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

	it("renders a jump input with a JUMP badge", () => {
		const el = document.createElement("div");
		const icons = createIconProvider(SF6_CONFIG.inputData);

		processFgBlock("j.HP", el, icons, SF6_CONFIG);

		const badge = el.querySelector(".fg-badge--jump");
		expect(badge).not.toBeNull();
		expect(badge?.textContent).toBe("JUMP");

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
});
