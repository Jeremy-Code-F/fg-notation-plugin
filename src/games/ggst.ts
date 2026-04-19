import { GameConfig } from "../game-config";
import GGST_P_PNG from "../assets/GGST-P.png";
import GGST_K_PNG from "../assets/GGST-K.png";
import GGST_D_PNG from "../assets/GGST-D.png";
import GGST_HS_PNG from "../assets/GGST-HS.png";
import GGST_S_PNG from "../assets/GGST-S.png";

const buttonPattern = "HS|H|S|P|K|D";

export const GGST_CONFIG: GameConfig = {
	buttonPattern,
	inputRe: new RegExp(`^(c\\.|f\\.|j\\.|[1-9]*)(${buttonPattern})$`),
	standaloneBadgeRe: /^(RC|Burst|THROW|RRC|YRC|66|WS|WB)$/,
	modifierBadgeRe: /^(\[CH\]|\[RISC\])$/,
	inputData: {
		P: { label: "P", cssClass: "ggst-p", png: GGST_P_PNG },
		K: { label: "K", cssClass: "ggst-k", png: GGST_K_PNG },
		S: { label: "S", cssClass: "ggst-s", png: GGST_S_PNG },
		H: { label: "HS", cssClass: "ggst-hs", png: GGST_HS_PNG },
		HS: { label: "HS", cssClass: "ggst-hs", png: GGST_HS_PNG },
		D: { label: "D", cssClass: "ggst-d", png: GGST_D_PNG },
		RC: { label: "RC", cssClass: "ggst-rc" },
		RRC: { label: "RC", cssClass: "ggst-rrc" },
		YRC: { label: "RC", cssClass: "ggst-yrc" },
		66: { label: "Dash", cssClass: "ggst-dash" },
		Burst: { label: "Burst", cssClass: "ggst-burst" },
		THROW: { label: "THROW", cssClass: "ggst-throw" },
		CH: { label: "CH", cssClass: "ggst-ch" },
		RISC: { label: "RISC", cssClass: "ggst-risc" },
		WS: { label: "Wall Splat", cssClass: "ggst-ws" },
		WB: { label: "Wall Break", cssClass: "ggst-wb" },
	},
	gameName: "GGST",
};
