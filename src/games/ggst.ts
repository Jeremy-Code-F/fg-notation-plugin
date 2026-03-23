import { GGST_P_SVG } from "icons";
import { GameConfig } from "../game-config";

export const GGST_CONFIG: GameConfig = {
	buttonPattern: "HS|S|P|K|D",
	standaloneBadgeRe: /^(RC|Burst|THROW)$/,
	modifierBadgeRe: /^(\[CH\]|\[RISC\])$/,
	buttonData: {
		P: { label: "P", cssClass: "ggst-p", svg: GGST_P_SVG },
		K: { label: "K", cssClass: "ggst-k" },
		S: { label: "S", cssClass: "ggst-s" },
		HS: { label: "HS", cssClass: "ggst-hs" },
		D: { label: "D", cssClass: "ggst-d" },
		RC: { label: "RC", cssClass: "ggst-rc" },
		Burst: { label: "Burst", cssClass: "ggst-burst" },
		THROW: { label: "THROW", cssClass: "ggst-throw" },
		CH: { label: "CH", cssClass: "ggst-ch" },
		RISC: { label: "RISC", cssClass: "ggst-risc" },
	},
	gameName: "GGST",
};
