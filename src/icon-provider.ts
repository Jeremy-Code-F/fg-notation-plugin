import { Button, Separator } from "./types";
import { BUTTON_SVG_ICONS, SEPARATOR_SVG_ICONS } from "./icons";

export interface IconProvider {
	renderButton(button: Button, parent: HTMLElement): void;
	renderBadge(button: Button, parent: HTMLElement): void;
	renderSeparator(separator: Separator, parent: HTMLElement): void;
}

export class TextIconProvider implements IconProvider {
	renderButton(button: Button, parent: HTMLElement): void {
		parent
			.createSpan({
				cls: ["fg-button", `fg-button--${button.toLowerCase()}`],
			})
			.setText(button);
	}

	renderBadge(button: Button, parent: HTMLElement): void {
		parent
			.createSpan({
				cls: ["fg-badge", `fg-badge--${button.toLowerCase()}`],
			})
			.setText(button);
	}

	renderSeparator(separator: Separator, parent: HTMLElement): void {
		const name = (() => {
			switch (separator) {
				case Separator.Cancel:
					return "cancel";
				case Separator.Chain:
					return "chain";
				case Separator.Link:
					return "link";
			}
		})();

		parent
			.createSpan({
				cls: ["fg-separator", `fg-separator--${name}`],
			})
			.setText(separator);
	}
}

export class SvgIconProvider implements IconProvider {
	private text = new TextIconProvider();

	renderButton(button: Button, parent: HTMLElement): void {
		const svgMarkup = BUTTON_SVG_ICONS[button];
		if (svgMarkup) {
			const span = parent.createSpan({
				cls: ["fg-button", `fg-button--${button.toLowerCase()}`],
			});
			span.innerHTML = svgMarkup;
		} else {
			this.text.renderButton(button, parent);
		}
	}

	renderBadge(button: Button, parent: HTMLElement): void {
		const svgMarkup = BUTTON_SVG_ICONS[button];
		if (svgMarkup) {
			const span = parent.createSpan({
				cls: ["fg-badge", `fg-badge--${button.toLowerCase()}`],
			});
			span.innerHTML = svgMarkup;
		} else {
			this.text.renderBadge(button, parent);
		}
	}

	renderSeparator(separator: Separator, parent: HTMLElement): void {
		console.log("Got a separator to render");
		const svgMarkup = SEPARATOR_SVG_ICONS[separator];
		if (svgMarkup) {
			// const span = parent.createSpan({
			// 	cls: ["fg-separator"],
			// });
			// span.innerHTML = svgMarkup;
			const name = (() => {
				switch (separator) {
					case Separator.Cancel:
						return "cancel";
					case Separator.Chain:
						return "chain";
					case Separator.Link:
						return "link";
				}
			})();

			const span = parent.createSpan({
				cls: ["fg-separator", `fg-separator--${name}`],
			});
			span.innerHTML = svgMarkup;
		} else {
			this.text.renderSeparator(separator, parent);
		}
	}
}
