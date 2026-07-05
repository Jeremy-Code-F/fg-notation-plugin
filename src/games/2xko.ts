import { GameConfig } from "../game-config";
import {
	TXKO_DASH,
	TXKO_H,
	TXKO_L,
	TXKO_M,
	TXKO_PARRY,
	TXKO_S1,
	TXKO_S2,
	TXKO_TAG,
} from "../icons";

// Icons from https://wiki.play2xko.com/en-us/Controls

const buttonPattern = "L|M|H|S1|S2|DASH|T|P";

export const TXKO_CONFIG: GameConfig = {
	buttonPattern,
	inputRe: new RegExp(`^((?:d\\.)?(?:[j]|[0-9]+)\\.?)?(${buttonPattern})$`),
	standaloneBadgeRe: /^(DRC|DR|DI|WALLSPLAT)$/,
	modifierBadgeRe: /^(\[CH\]|\[PC\])$/,
	inputData: {
		L: { label: "L", cssClass: "txko-l", svg: TXKO_L },
		M: { label: "M", cssClass: "txko-m", svg: TXKO_M },
		H: { label: "H", cssClass: "txko-h", svg: TXKO_H },
		S1: { label: "S1", cssClass: "txko-s1", svg: TXKO_S1 },
		S2: { label: "S2", cssClass: "txko-s2", svg: TXKO_S2 },
		DASH: { label: "DASH", cssClass: "txko-dash", svg: TXKO_DASH },
		T: { label: "TAG", cssClass: "tag", svg: TXKO_TAG },
		P: { label: "PARRY", cssClass: "parry", svg: TXKO_PARRY },
	},
	gameName: "2XKO",
};
