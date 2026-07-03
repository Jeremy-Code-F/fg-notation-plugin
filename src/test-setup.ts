// Vitest runs against plain jsdom, which doesn't have Obsidian's DOM
// extensions (createEl/createSpan/createDiv/addClass/setText/etc). Obsidian's
// real app patches these onto HTMLElement/DocumentFragment at runtime, so we
// reproduce the subset of that patch needed to exercise rendering code here.
// `DomElementInfo` is declared ambient-global by obsidian's types, so no import is needed.

function applyDomElementInfo(el: HTMLElement, o?: DomElementInfo | string) {
	if (!o) return el;
	if (typeof o === "string") {
		el.className = o;
		return el;
	}
	if (o.cls) {
		const classes = Array.isArray(o.cls) ? o.cls : o.cls.split(" ");
		el.addClass(...classes.filter(Boolean));
	}
	if (o.text !== undefined) el.setText(o.text);
	if (o.attr) {
		for (const [key, value] of Object.entries(o.attr)) {
			if (value === null || value === undefined) continue;
			el.setAttribute(key, String(value));
		}
	}
	if (o.title) el.setAttribute("title", o.title);
	if (o.type) el.setAttribute("type", o.type);
	if (o.value !== undefined) (el as HTMLInputElement).value = o.value;
	if (o.placeholder) el.setAttribute("placeholder", o.placeholder);
	if (o.href) el.setAttribute("href", o.href);
	if (o.parent) {
		if (o.prepend) o.parent.insertBefore(el, o.parent.firstChild);
		else o.parent.appendChild(el);
	}
	return el;
}

Node.prototype.empty = function (this: Node) {
	while (this.firstChild) this.removeChild(this.firstChild);
};

Node.prototype.detach = function (this: Node) {
	this.parentNode?.removeChild(this);
};

Node.prototype.createEl = function <K extends keyof HTMLElementTagNameMap>(
	this: Node,
	tag: K,
	o?: DomElementInfo | string,
	callback?: (el: HTMLElementTagNameMap[K]) => void,
) {
	const el = document.createElement(tag);
	this.appendChild(el);
	applyDomElementInfo(el, o);
	callback?.(el);
	return el;
} as typeof Node.prototype.createEl;

Node.prototype.createDiv = function (
	this: Node,
	o?: DomElementInfo | string,
	callback?: (el: HTMLDivElement) => void,
) {
	return this.createEl("div", o, callback);
};

Node.prototype.createSpan = function (
	this: Node,
	o?: DomElementInfo | string,
	callback?: (el: HTMLSpanElement) => void,
) {
	return this.createEl("span", o, callback);
};

Element.prototype.setText = function (
	this: Element,
	val: string | DocumentFragment,
) {
	this.empty();
	if (val instanceof DocumentFragment) this.appendChild(val);
	else this.textContent = val;
};

Element.prototype.getText = function (this: Element) {
	return this.textContent ?? "";
};

Element.prototype.addClass = function (this: Element, ...classes: string[]) {
	this.classList.add(...classes);
};

Element.prototype.addClasses = function (this: Element, classes: string[]) {
	this.classList.add(...classes);
};

Element.prototype.removeClass = function (
	this: Element,
	...classes: string[]
) {
	this.classList.remove(...classes);
};

Element.prototype.removeClasses = function (
	this: Element,
	classes: string[],
) {
	this.classList.remove(...classes);
};

Element.prototype.toggleClass = function (
	this: Element,
	classes: string | string[],
	value: boolean,
) {
	for (const cls of Array.isArray(classes) ? classes : [classes]) {
		this.classList.toggle(cls, value);
	}
};

Element.prototype.hasClass = function (this: Element, cls: string) {
	return this.classList.contains(cls);
};
