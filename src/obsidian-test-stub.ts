// Stand-in for the `obsidian` package in tests. The published package is
// types-only (no runtime build), so Vite can't resolve it at all; this file
// is aliased in place of it (see vitest.config.ts) and implements just the
// runtime pieces our code actually calls.
export function sanitizeHTMLToDom(html: string): DocumentFragment {
	// Parse into a separate inert document, then move the nodes over
	const parsed = new DOMParser().parseFromString(html, "text/html");
	const fragment = new DocumentFragment();
	fragment.append(...Array.from(parsed.body.childNodes));
	return fragment;
}
