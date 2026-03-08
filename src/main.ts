import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, MyPluginSettings, SampleSettingTab } from "./settings";
import { processFgBlock } from "./fg-renderer";
import { TextIconProvider, SvgIconProvider } from "./icon-provider";

export default class FgNotationPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("fg", (source, el) => {
			const icons = this.settings.useSvgIcons ? new SvgIconProvider() : new TextIconProvider();
			processFgBlock(source, el, icons);
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
