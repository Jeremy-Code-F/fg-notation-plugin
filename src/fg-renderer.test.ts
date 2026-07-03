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
});
