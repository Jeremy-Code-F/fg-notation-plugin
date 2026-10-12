import { Plugin } from "obsidian";
import { processFgBlock } from "./fg-renderer";
import { createIconProvider } from "./icon-provider";
import { SF6_CONFIG } from "./games/sf6";

export default class FgNotationPlugin extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor("fg", (source, el) => {
			processFgBlock(
				source,
				el,
				createIconProvider(SF6_CONFIG.inputData),
				SF6_CONFIG,
			);
		});

		this.registerMarkdownCodeBlockProcessor("fg-sf6", (source, el) => {
			processFgBlock(
				source,
				el,
				createIconProvider(SF6_CONFIG.inputData),
				SF6_CONFIG,
			);
		});
	}

	onunload() {}
}
