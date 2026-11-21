import tseslint from 'typescript-eslint';
import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import { globalIgnores } from "eslint/config";

export default tseslint.config(
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				projectService: {
					allowDefaultProject: [
						'eslint.config.js',
						'manifest.json'
					]
				},
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.json']
			},
		},
	},
	...obsidianmd.configs.recommended,
	{
		plugins: { "@typescript-eslint": tseslint.plugin },
		rules: {
			// Allow intentionally unused variables when prefixed with "_",
			// e.g. omitting a property via destructuring
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
			],
		},
	},
	{
		// Tests run under Node and never ship in main.js, so they can use
		// Node built-ins like fs to read docs
		files: ["src/**/*.test.ts"],
		languageOptions: {
			globals: { ...globals.node },
		},
		rules: {
			"import/no-nodejs-modules": "off",
		},
	},
	globalIgnores([
		"node_modules",
		"dist",
		"esbuild.config.mjs",
		"eslint.config.js",
		"eslint.config.mts",
		"version-bump.mjs",
		"versions.json",
		"main.js",
		// Test and tooling files that never ship in main.js
		"vitest.config.ts",
		"scripts",
	]),
);
