import path from "node:path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths()],
	resolve: {
		alias: {
			// The published `obsidian` package is types-only (no runtime
			// build), so it can't be resolved as-is under Vite/Vitest.
			obsidian: path.resolve(__dirname, "src/obsidian-test-stub.ts"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test-setup.ts"],
	},
});
