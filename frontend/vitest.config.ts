import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: "./vitest.setup.ts",
		globals: true,
		include: ["__tests__/**/*.{test,spec}.{ts,tsx}"],
		environmentOptions: {
			jsdom: { pretendToBeVisual: true },
		},
		onConsoleLog(log) {
			if (log.includes("Not implemented: navigation")) return false;
		},
	},
	resolve: {
		alias: { "@": resolve(__dirname, ".") },
	},
});
