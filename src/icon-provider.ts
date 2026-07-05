import { Separator } from "./types";
import { ButtonData, SEPARATOR_DATA } from "./symbol-data";

import { sanitizeHTMLToDom } from "obsidian";
export interface IconProvider {
	renderButton(button: string, parent: HTMLElement): void;
	renderBadge(button: ButtonData, parent: HTMLElement): void;
	renderSeparator(separator: Separator, parent: HTMLElement): void;
}

export class TextIconProvider implements IconProvider {
	constructor(private inputData: Record<string, ButtonData>) {}

	renderButton(button: string, parent: HTMLElement): void {
		const data = this.inputData[button];
		if (!data) return;
		const { label, cssClass } = data;

		if (data.label === "THROW") {
			parent
				.createSpan({ cls: ["fg-badge", `fg-badge--${cssClass}`] })
				.setText(label);
		} else {
			parent
				.createSpan({ cls: ["fg-button", `fg-button--${cssClass}`] })
				.setText(label);
		}
	}

	renderBadge(button: ButtonData, parent: HTMLElement): void {
		console.debug(`Rendering badge for '${JSON.stringify(button)}'`);
		parent
			.createSpan({ cls: ["fg-badge", `fg-badge--${button.cssClass}`] })
			.setText(button.label);
	}

	renderSeparator(separator: Separator, parent: HTMLElement): void {
		const { label, cssClass } = SEPARATOR_DATA[separator];
		parent
			.createSpan({ cls: ["fg-separator", `fg-separator--${cssClass}`] })
			.setText(label);
	}
}

export class AdaptiveIconProvider implements IconProvider {
	private text: TextIconProvider;

	constructor(private inputData: Record<string, ButtonData>) {
		this.text = new TextIconProvider(inputData);
	}

	private createImg(src: string, alt: string): HTMLImageElement {
		const img = document.createElement("img");
		img.src = src;
		img.alt = alt;
		img.addEventListener("error", () => img.remove(), { once: true });
		return img;
	}

	renderButton(button: string, parent: HTMLElement): void {
		const data = this.inputData[button];
		if (!data) return;
		if (data.svg) {
			const span = parent.createSpan({
				cls: ["fg-button", `fg-button--${data.cssClass}`],
			});
			span.appendChild(sanitizeHTMLToDom(data.svg));
		} else if (data.png) {
			const span = parent.createSpan({
				cls: ["fg-button", `fg-button--${data.cssClass}`],
			});
			span.appendChild(this.createImg(data.png, data.label));
		} else {
			this.text.renderButton(button, parent);
		}
	}

	renderBadge(button: ButtonData, parent: HTMLElement): void {
		if (button.svg) {
			const span = parent.createSpan({
				cls: ["fg-badge", `fg-badge--${button.cssClass}`],
			});
			span.appendChild(sanitizeHTMLToDom(button.svg));
		} else if (button.png) {
			const span = parent.createSpan({
				cls: ["fg-badge", `fg-badge--${button.cssClass}`],
			});
			span.appendChild(this.createImg(button.png, button.label));
		} else {
			this.text.renderBadge(button, parent);
		}
	}

	renderSeparator(separator: Separator, parent: HTMLElement): void {
		const { cssClass, svg } = SEPARATOR_DATA[separator];
		if (svg) {
			const span = parent.createSpan({
				cls: ["fg-separator", `fg-separator--${cssClass}`],
			});
			span.appendChild(sanitizeHTMLToDom(svg));
		} else {
			this.text.renderSeparator(separator, parent);
		}
	}
}

export function createIconProvider(
	buttonData: Record<string, ButtonData>,
): IconProvider {
	return new AdaptiveIconProvider(buttonData);
}
