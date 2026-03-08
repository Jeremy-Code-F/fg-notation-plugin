export { Direction, Button } from "./types";
export type { IconProvider } from "./types";
import { Direction, Button, IconProvider } from "./types";

const DIRECTION_MAP: Record<string, Direction> = Object.fromEntries(
	Object.values(Direction).map(v => [v, v as Direction])
);
const BUTTON_MAP: Record<string, Button> = Object.fromEntries(
	Object.values(Button).map(v => [v, v as Button])
);

const DIRECTION_ARROWS: Record<Direction, string> = {
	[Direction.DownBack]: "↙",
	[Direction.Down]: "↓",
	[Direction.DownForward]: "↘",
	[Direction.Back]: "←",
	[Direction.Neutral]: "",
	[Direction.Forward]: "→",
	[Direction.UpBack]: "↖",
	[Direction.Up]: "↑",
	[Direction.UpForward]: "↗",
	// Motions expanded into their component arrows
	[Direction.DoubleQuarterCircleForward]: "↓↘→↓↘→",
	[Direction.QuarterCircleForward]: "↓↘→",
	[Direction.QuarterCircleBack]: "↓↙←",
	[Direction.DragonPunch]: "→↓↘",
	[Direction.ReverseDragonPunch]: "←↓↙",
	[Direction.HalfCircleForward]: "←↙↓↘→",
	[Direction.HalfCircleBack]: "→↘↓↙←",
	[Direction.DoubleDown]: "↓↓",
	[Direction.DoubleTapForward]: "→→",
	[Direction.DoubleTapBack]: "←←",
};

function parseDirection(raw: string): Direction | null {
	return DIRECTION_MAP[raw] ?? null;
}
function parseButton(raw: string): Button | null {
	return BUTTON_MAP[raw] ?? null;
}

type InputToken = { kind: "input"; direction: Direction; button: Button };
type SeparatorToken = { kind: "separator"; value: string };
type BadgeToken = { kind: "badge"; button: Button };
type RawToken = { kind: "raw"; value: string };
type FgToken = InputToken | SeparatorToken | BadgeToken | RawToken;

const INPUT_RE = /^([1-9]+)\.([LMH][PK])$/;
const SEPARATOR_RE = /^(>|,|\+)$/;
const STANDALONE_BUTTON_RE = /^(DRC|DR|DI)$/;
const MODIFIER_RE = /^(\[CH\]|\[PC\])$/;

function parseLine(line: string): FgToken[] {
	const tokens: FgToken[] = [];
	for (const part of line.split(/\s+/)) {
		if (part.length === 0) continue;

		const inputMatch = INPUT_RE.exec(part);
		if (inputMatch) {
			const [, rawDir, rawBtn] = inputMatch;
			if (rawDir !== undefined && rawBtn !== undefined) {
				const direction = parseDirection(rawDir);
				const button = parseButton(rawBtn);
				if (direction !== null && button !== null) {
					tokens.push({ kind: "input", direction, button });
					continue;
				}
			}
		}

		if (SEPARATOR_RE.test(part)) {
			tokens.push({ kind: "separator", value: part });
			continue;
		}

		if (MODIFIER_RE.test(part)) {
			const button = parseButton(part.replace(/[\[\]]/g, ""));
			if (button !== null) {
				tokens.push({ kind: "badge", button });
				continue;
			}
		}

		if (STANDALONE_BUTTON_RE.test(part)) {
			const button = parseButton(part);
			if (button !== null) {
				tokens.push({ kind: "badge", button });
				continue;
			}
		}

		tokens.push({ kind: "raw", value: part });
	}
	return tokens;
}

function parseFgSource(source: string): FgToken[][] {
	return source
		.split("\n")
		.filter(line => line.trim().length > 0)
		.map(line => parseLine(line.trim()));
}

function renderToken(token: FgToken, parent: HTMLElement, icons: IconProvider): void {
	if (token.kind === "input") {
		const wrapper = parent.createSpan({ cls: "fg-input" });
		const arrows = DIRECTION_ARROWS[token.direction];
		if (arrows) {
			wrapper.createSpan({ cls: ["fg-direction", "fg-arrows"] }).setText(arrows);
		}
		icons.renderButton(token.button, wrapper);
	} else if (token.kind === "separator") {
		parent.createSpan({ cls: "fg-separator" }).setText(` ${token.value} `);
	} else if (token.kind === "badge") {
		icons.renderBadge(token.button, parent);
	} else {
		parent.createSpan({ cls: "fg-raw" }).setText(token.value);
	}
}

function renderFgNotation(lines: FgToken[][], el: HTMLElement, icons: IconProvider): void {
	el.addClass("fg-notation-block");
	for (const lineTokens of lines) {
		const lineEl = el.createDiv({ cls: "fg-line" });
		for (const token of lineTokens) {
			renderToken(token, lineEl, icons);
		}
	}
}

export function processFgBlock(source: string, el: HTMLElement, icons: IconProvider): void {
	renderFgNotation(parseFgSource(source), el, icons);
}
