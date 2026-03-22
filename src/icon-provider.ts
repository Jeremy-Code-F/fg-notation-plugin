import { Button, Separator } from "./types";
import { BUTTON_DATA, SEPARATOR_DATA } from "./symbol-data";

export interface IconProvider {
	renderButton(button: Button, parent: HTMLElement): void;
	renderBadge(button: Button, parent: HTMLElement): void;
	renderSeparator(separator: Separator, parent: HTMLElement): void;
}

export class TextIconProvider implements IconProvider {
	renderButton(button: Button, parent: HTMLElement): void {
		const { label, cssClass } = BUTTON_DATA[button];
		parent
			.createSpan({ cls: ["fg-button", `fg-button--${cssClass}`] })
			.setText(label);
	}

	renderBadge(button: Button, parent: HTMLElement): void {
		const { label, cssClass } = BUTTON_DATA[button];
		parent
			.createSpan({ cls: ["fg-badge", `fg-badge--${cssClass}`] })
			.setText(label);
	}

	renderSeparator(separator: Separator, parent: HTMLElement): void {
		const { label, cssClass } = SEPARATOR_DATA[separator];
		parent
			.createSpan({ cls: ["fg-separator", `fg-separator--${cssClass}`] })
			.setText(label);
	}
}

export class SvgIconProvider implements IconProvider {
	private text = new TextIconProvider();

	renderButton(button: Button, parent: HTMLElement): void {
		const { cssClass, svg } = BUTTON_DATA[button];
		if (svg) {
			const span = parent.createSpan({
				cls: ["fg-button", `fg-button--${cssClass}`],
			});
			span.innerHTML = svg;
		} else {
			this.text.renderButton(button, parent);
		}
	}

	renderBadge(button: Button, parent: HTMLElement): void {
		const { cssClass, svg } = BUTTON_DATA[button];
		if (svg) {
			const span = parent.createSpan({
				cls: ["fg-badge", `fg-badge--${cssClass}`],
			});
			span.innerHTML = svg;
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
			span.innerHTML = svg;
		} else {
			this.text.renderSeparator(separator, parent);
		}
	}
}
