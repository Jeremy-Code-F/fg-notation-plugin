export { Direction, Button } from "./types";
import { ChargeInputToken, Direction, FgToken, InputToken } from "./types";
import { IconProvider } from "icon-provider";
import { DIRECTION_DATA } from "./symbol-data";
import { FgParser } from "fg-parser";

function renderToken(
	token: FgToken,
	parent: HTMLElement,
	icons: IconProvider,
): void {
	if (token.kind === "input") {
		renderInputToken(token, parent, icons);
	} else if (token.kind === "separator") {
		icons.renderSeparator(token.separator, parent);
	} else if (token.kind == "charge-input") {
		renderChargeInputToken(token, parent, icons);
	} else if (token.kind === "badge") {
		icons.renderBadge(token.button, parent);
	} else {
		parent.createSpan({ cls: "fg-raw" }).setText(token.value);
	}
}

function renderInputToken(
	token: InputToken,
	parent: HTMLElement,
	iconProvider: IconProvider,
) {
	const wrapper = parent.createSpan({ cls: "fg-input" });
	const arrows = DIRECTION_DATA[token.direction].arrows;

	if (token.direction === Direction.Jump) {
		wrapper
			.createSpan({
				cls: ["fg-badge", `fg-badge--jump`],
			})
			.setText("jump");
	} else {
		if (arrows) {
			wrapper
				.createSpan({ cls: ["fg-direction", "fg-arrows"] })
				.setText(arrows);
		}
	}

	iconProvider.renderButton(token.button, wrapper);
}

function renderChargeInputToken(
	token: ChargeInputToken,
	parent: HTMLElement,
	iconProvider: IconProvider,
) {
	console.log(`Charge input token direction was ${token.direction}`);
	const wrapper = parent.createSpan({ cls: "fg-input" });
	const directionArrows = DIRECTION_DATA[token.direction].arrows;
	const chargeArrows = DIRECTION_DATA[token.charge].arrows;
	wrapper
		.createSpan({ cls: ["fg-charge", "fg-arrows"] })
		.setText(chargeArrows);
	wrapper.createSpan({ cls: ["fg-arrows"] }).setText(directionArrows);
	iconProvider.renderButton(token.button, wrapper);
}

function renderFgNotation(
	lines: FgToken[][],
	el: HTMLElement,
	icons: IconProvider,
): void {
	el.addClass("fg-notation-block");
	for (const lineTokens of lines) {
		const lineEl = el.createDiv({ cls: "fg-line" });
		for (const token of lineTokens) {
			renderToken(token, lineEl, icons);
		}
	}
}

export function processFgBlock(
	source: string,
	el: HTMLElement,
	icons: IconProvider,
): void {
	let fg_parser = new FgParser();
	renderFgNotation(fg_parser.parseFgSource(source), el, icons);
}
