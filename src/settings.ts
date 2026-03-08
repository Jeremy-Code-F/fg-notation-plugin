import { App, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "./main";

export interface MyPluginSettings {
	mySetting: string;
	useSvgIcons: boolean;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	useSvgIcons: false,
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Use SVG icons')
			.setDesc('Replace text button labels with SVG icons when available')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.useSvgIcons)
				.onChange(async (value) => {
					this.plugin.settings.useSvgIcons = value;
					await this.plugin.saveSettings();
				}));
	}
}
