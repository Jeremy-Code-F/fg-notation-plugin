import { Button } from "./types";
import { BUTTON_SVG_ICONS } from "./icons";

export interface IconProvider {
	renderButton(button: Button, parent: HTMLElement): void;
	renderBadge(button: Button, parent: HTMLElement): void;
}

export class TextIconProvider implements IconProvider {
	renderButton(button: Button, parent: HTMLElement): void {
		parent.createSpan({ cls: ["fg-button", `fg-button--${button.toLowerCase()}`] }).setText(button);
	}

	renderBadge(button: Button, parent: HTMLElement): void {
		parent.createSpan({ cls: ["fg-badge", `fg-badge--${button.toLowerCase()}`] }).setText(button);
	}
}

export class SvgIconProvider implements IconProvider {
	private text = new TextIconProvider();

	renderButton(button: Button, parent: HTMLElement): void {
		const svgMarkup = BUTTON_SVG_ICONS[button];
		if (svgMarkup) {
			const span = parent.createSpan({ cls: ["fg-button", `fg-button--${button.toLowerCase()}`] });
			span.innerHTML = svgMarkup;
		} else {
			this.text.renderButton(button, parent);
		}
	}

	renderBadge(button: Button, parent: HTMLElement): void {
		const svgMarkup = BUTTON_SVG_ICONS[button];
		if (svgMarkup) {
			const span = parent.createSpan({ cls: ["fg-badge", `fg-badge--${button.toLowerCase()}`] });
			span.innerHTML = svgMarkup;
		} else {
			this.text.renderBadge(button, parent);
		}
	}
}
