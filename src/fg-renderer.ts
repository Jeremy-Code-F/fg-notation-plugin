export { Direction, Button } from "./types";
import { Direction, FgToken } from "./types";
import { IconProvider } from "icon-provider";
import { DIRECTION_ARROWS } from "consts";
import { FgParser } from "fg-parser";

function renderToken(
	token: FgToken,
	parent: HTMLElement,
	icons: IconProvider,
): void {
	if (token.kind === "input") {
		const wrapper = parent.createSpan({ cls: "fg-input" });
		const arrows = DIRECTION_ARROWS[token.direction];

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

		icons.renderButton(token.button, wrapper);
	} else if (token.kind === "separator") {
		icons.renderSeparator(token.separator, parent);
	} else if (token.kind == "charge-input") {
		console.log(`Charge input token direction was ${token.direction}`);
		const wrapper = parent.createSpan({ cls: "fg-input" });
		const directionArrows = DIRECTION_ARROWS[token.direction];
		const chargeArrows = DIRECTION_ARROWS[token.charge];
		wrapper
			.createSpan({ cls: ["fg-charge", "fg-arrows"] })
			.setText(chargeArrows);
		wrapper.createSpan({ cls: ["fg-arrows"] }).setText(directionArrows);
		icons.renderButton(token.button, wrapper);
	} else if (token.kind === "badge") {
		icons.renderBadge(token.button, parent);
	} else {
		parent.createSpan({ cls: "fg-raw" }).setText(token.value);
	}
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
