import { Plugin } from "obsidian";
import {
	DEFAULT_SETTINGS,
	MyPluginSettings,
	SampleSettingTab,
} from "./settings";
import { processFgBlock } from "./fg-renderer";
import { createIconProvider } from "./icon-provider";
import { SF6_CONFIG } from "./games/sf6";
import { GGST_CONFIG } from "games/ggst";

export default class FgNotationPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("fg", (source, el) => {
			processFgBlock(source, el, createIconProvider(SF6_CONFIG.buttonData), SF6_CONFIG);
		});

		this.registerMarkdownCodeBlockProcessor("fg-sf6", (source, el) => {
			processFgBlock(source, el, createIconProvider(SF6_CONFIG.buttonData), SF6_CONFIG);
		});

		this.registerMarkdownCodeBlockProcessor("fg-ggst", (source, el) => {
			processFgBlock(source, el, createIconProvider(GGST_CONFIG.buttonData), GGST_CONFIG);
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<MyPluginSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
