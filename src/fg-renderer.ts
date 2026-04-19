export { Direction } from "./types";
import { ChargeInputToken, Direction, FgToken, InputToken } from "./types";
import { IconProvider } from "icon-provider";
import { DIRECTION_DATA } from "./symbol-data";
import { FgParser } from "fg-parser";
import { GameConfig } from "./game-config";

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

	if (token.delayed) {
		iconProvider.renderBadge("DELAY", wrapper);
	}

	if (token.direction === Direction.Jump) {
		console.log("Rendering jump badge");
		iconProvider.renderBadge("JUMP", wrapper);
	}
	else if (token.direction === Direction.Close) {
		iconProvider.renderBadge("CLOSE", wrapper);
	}
	else if (token.direction === Direction.Far) {
		iconProvider.renderBadge("FAR", wrapper);
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
	config: GameConfig,
): void {
	console.log("Processing fg block for ggst");
	const parser = new FgParser(config);
	renderFgNotation(parser.parseFgSource(source), el, icons);
}
