import { ThrowInputlabel } from "types";
import { GameConfig } from "../game-config";
import { LP_SVG, MP_SVG, HP_SVG, LK_SVG, MK_SVG, HK_SVG } from "../icons";

const buttonPattern = "[LMH][PK]|PPP|KKK|PP|KK|THROW";

export const SF6_CONFIG: GameConfig = {
	buttonPattern,
	inputRe: new RegExp(`^((?:d\\.)?(?:[j]|[0-9]+)\\.?)?(${buttonPattern})$`),
	standaloneBadgeRe: /^(DRC|DR|DI|WALLSPLAT)$/,
	modifierBadgeRe: /^(\[CH\]|\[PC\])$/,
	inputData: {
		LP: { label: "LP", cssClass: "lp", svg: LP_SVG },
		MP: { label: "MP", cssClass: "mp", svg: MP_SVG },
		HP: { label: "HP", cssClass: "hp", svg: HP_SVG },
		LK: { label: "LK", cssClass: "lk", svg: LK_SVG },
		MK: { label: "MK", cssClass: "mk", svg: MK_SVG },
		HK: { label: "HK", cssClass: "hk", svg: HK_SVG },
		PP: { label: "PP", cssClass: "pp", svg: LP_SVG + MP_SVG },
		KK: { label: "KK", cssClass: "kk", svg: LK_SVG + MK_SVG },
		PPP: { label: "PPP", cssClass: "ppp", svg: LP_SVG + MP_SVG + HP_SVG },
		KKK: { label: "KKK", cssClass: "kkk", svg: LK_SVG + MK_SVG + HK_SVG },
		DR: { label: "DR", cssClass: "dr" },
		DRC: { label: "DRC", cssClass: "drc" },
		DI: { label: "DI", cssClass: "di" },
		CH: { label: "CH", cssClass: "ch" },
		PC: { label: "PC", cssClass: "pc" },
		JUMP: { label: "JUMP", cssClass: "jump" },
		CLOSE: { label: "CLOSE", cssClass: "close" },
		FAR: { label: "FAR", cssClass: "far" },
		DELAY: { label: "DELAY", cssClass: "delay" },
		THROW: { label: ThrowInputlabel, cssClass: "throw" },
		WALLSPLAT: { label: "WALLSPLAT", cssClass: "wallsplat" },
	},
	gameName: "SF6",
};
