export { Direction } from "./types";
import { ChargeInputToken, Direction, FgToken, InputToken } from "./types";
import { IconProvider } from "icon-provider";
import { ButtonType, DIRECTION_DATA, JUMP_BADGE_DATA } from "./symbol-data";
import { GameConfig } from "./game-config";
import { FgTokenizerParser } from "fg-tokenizer-parser";
import { assertNever } from "./utils";

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
		icons.renderBadge(token.buttonData, parent);
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
	const directions_requiring_badge = new Set([
		Direction.Jump,
		Direction.Close,
		Direction.Far,
	]);

	if (token.delayed) {
		iconProvider.renderBadge("DELAY", wrapper);
	}

	if (token.jump) {
		iconProvider.renderBadge(JUMP_BADGE_DATA, wrapper);
	}

	if (token.tigerKnee) {
		console.debug(`Attempting to render tiger knee badge`);
		iconProvider.renderBadge("TIGER_KNEE", wrapper);
	}

	if (directions_requiring_badge.has(token.direction)) {
		iconProvider.renderBadge(token.direction, wrapper);
	} else {
		if (arrows) {
			wrapper
				.createSpan({ cls: ["fg-direction", "fg-arrows"] })
				.setText(arrows);
		}
	}

	switch (token.buttonData.buttonType) {
		case ButtonType.Special:
		case ButtonType.Normal:
			iconProvider.renderButton(token.button, parent);
			break;
		case ButtonType.Super:
		case ButtonType.Modifier:
			iconProvider.renderBadge(token.buttonData, parent);
			break;
		default:
			assertNever(token.buttonData.buttonType);
	}
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
	console.debug("Processing fg block for ggst");
	//const parser = new FgParser(config);
	const parser = new FgTokenizerParser(config);
	renderFgNotation(parser.parseFgSource(source), el, icons);
}
