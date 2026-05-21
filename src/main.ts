import { Plugin } from "obsidian";
import {
	DEFAULT_SETTINGS,
	FgPluginSettings,
	FgPluginSettingsTab,
} from "./settings";
import { processFgBlock } from "./fg-renderer";
import { createIconProvider } from "./icon-provider";
import { SF6_CONFIG } from "./games/sf6";
import { GGST_CONFIG } from "games/ggst";
import { COTW_CONFIG } from "games/cotw";
import { TXKO_CONFIG } from "games/2xko";

export default class FgNotationPlugin extends Plugin {
	settings: FgPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new FgPluginSettingsTab(this.app, this));

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

		this.registerMarkdownCodeBlockProcessor("fg-ggst", (source, el) => {
			processFgBlock(
				source,
				el,
				createIconProvider(GGST_CONFIG.inputData),
				GGST_CONFIG,
			);
		});

		this.registerMarkdownCodeBlockProcessor("fg-cotw", (source, el) => {
			processFgBlock(
				source,
				el,
				createIconProvider(COTW_CONFIG.inputData),
				COTW_CONFIG,
			);
		});

		this.registerMarkdownCodeBlockProcessor("fg-txko", (source, el) => {
			processFgBlock(
				source,
				el,
				createIconProvider(TXKO_CONFIG.inputData),
				TXKO_CONFIG,
			);
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<FgPluginSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
