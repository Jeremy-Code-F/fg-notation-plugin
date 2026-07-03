// Stand-in for the `obsidian` package in tests. The published package is
// types-only (no runtime build), so Vite can't resolve it at all; this file
// is aliased in place of it (see vitest.config.ts) and implements just the
// runtime pieces our code actually calls.
export function sanitizeHTMLToDom(html: string): DocumentFragment {
	const template = document.createElement("template");
	template.innerHTML = html;
	const fragment = document.createDocumentFragment();
	fragment.append(...Array.from(template.content.childNodes));
	return fragment;
}
