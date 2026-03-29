import { GameConfig } from "../game-config";
import GGST_P_PNG from "../assets/GGST-P.png";
import GGST_K_PNG from "../assets/GGST-K.png";
import GGST_D_PNG from "../assets/GGST-D.png";

export const GGST_CONFIG: GameConfig = {
	buttonPattern: "HS|S|P|K|D",
	standaloneBadgeRe: /^(RC|Burst|THROW)$/,
	modifierBadgeRe: /^(\[CH\]|\[RISC\])$/,
	buttonData: {
		P: { label: "P", cssClass: "ggst-p", png: GGST_P_PNG },
		K: { label: "K", cssClass: "ggst-k", png: GGST_K_PNG },
		S: { label: "S", cssClass: "ggst-s" },
		HS: { label: "HS", cssClass: "ggst-hs" },
		D: { label: "D", cssClass: "ggst-d", png: GGST_D_PNG },
		RC: { label: "RC", cssClass: "ggst-rc" },
		Burst: { label: "Burst", cssClass: "ggst-burst" },
		THROW: { label: "THROW", cssClass: "ggst-throw" },
		CH: { label: "CH", cssClass: "ggst-ch" },
		RISC: { label: "RISC", cssClass: "ggst-risc" },
	},
	gameName: "GGST",
};
