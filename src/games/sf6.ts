import { ThrowInputlabel } from "types";
import { ButtonType } from "symbol-data";
import { GameConfig } from "../game-config";
import { LP_SVG, MP_SVG, HP_SVG, LK_SVG, MK_SVG, HK_SVG } from "../icons";

const buttonPattern = "[LMH][PK]|PPP|KKK|PP|KK|THROW";

export const SF6_CONFIG: GameConfig = {
	buttonPattern,
	inputRe: new RegExp(
		`^((?:d\\.)?(?:tk\\.)?(?:[j]|[0-9]+)\\.?)?(${buttonPattern})$`,
	),
	standaloneBadgeRe: /^(DRC|DR|DI|WALLSPLAT|SA1|SA2|SA3)$/,
	modifierBadgeRe: /^(\[CH\]|\[PC\])$/,
	inputData: {
		LP: {
			label: "LP",
			cssClass: "lp",
			svg: LP_SVG,
			buttonType: ButtonType.Normal,
		},
		MP: {
			label: "MP",
			cssClass: "mp",
			svg: MP_SVG,
			buttonType: ButtonType.Normal,
		},
		HP: {
			label: "HP",
			cssClass: "hp",
			svg: HP_SVG,
			buttonType: ButtonType.Normal,
		},
		LK: {
			label: "LK",
			cssClass: "lk",
			svg: LK_SVG,
			buttonType: ButtonType.Normal,
		},
		MK: {
			label: "MK",
			cssClass: "mk",
			svg: MK_SVG,
			buttonType: ButtonType.Normal,
		},
		HK: {
			label: "HK",
			cssClass: "hk",
			svg: HK_SVG,
			buttonType: ButtonType.Normal,
		},
		PP: {
			label: "PP",
			cssClass: "pp",
			svg: LP_SVG + MP_SVG,
			buttonType: ButtonType.Normal,
		},
		KK: {
			label: "KK",
			cssClass: "kk",
			svg: LK_SVG + MK_SVG,
			buttonType: ButtonType.Normal,
		},
		PPP: {
			label: "PPP",
			cssClass: "ppp",
			svg: LP_SVG + MP_SVG + HP_SVG,
			buttonType: ButtonType.Normal,
		},
		KKK: {
			label: "KKK",
			cssClass: "kkk",
			svg: LK_SVG + MK_SVG + HK_SVG,
			buttonType: ButtonType.Normal,
		},
		DR: {
			label: "DR",
			cssClass: "dr",
			buttonType: ButtonType.Normal,
		},
		DRC: {
			label: "DRC",
			cssClass: "drc",
			buttonType: ButtonType.Normal,
		},
		DI: {
			label: "DI",
			cssClass: "di",
			buttonType: ButtonType.Special,
		},
		CH: {
			label: "CH",
			cssClass: "ch",
			buttonType: ButtonType.Normal,
		},
		PC: {
			label: "PC",
			cssClass: "pc",
			buttonType: ButtonType.Normal,
		},
		j: {
			label: "JUMP",
			cssClass: "jump",
			buttonType: ButtonType.Normal,
		},
		OR: {
			label: "OR",
			cssClass: "or",
			buttonType: ButtonType.Normal,
		},
		TIGER_KNEE: {
			label: "Tiger Knee",
			cssClass: "tk",
			buttonType: ButtonType.Normal,
		},
		CLOSE: {
			label: "CLOSE",
			cssClass: "close",
			buttonType: ButtonType.Normal,
		},
		FAR: {
			label: "FAR",
			cssClass: "far",
			buttonType: ButtonType.Normal,
		},
		DELAY: {
			label: "DELAY",
			cssClass: "delay",
			buttonType: ButtonType.Normal,
		},
		THROW: {
			label: ThrowInputlabel,
			cssClass: "throw",
			buttonType: ButtonType.Normal,
		},
		WALLSPLAT: {
			label: "WALLSPLAT",
			cssClass: "wallsplat",
			buttonType: ButtonType.Normal,
		},
		SA1: {
			label: "Super Art 1",
			cssClass: "sa1",
			buttonType: ButtonType.Normal,
		},
		SA2: {
			label: "Super Art 2",
			cssClass: "sa2",
			buttonType: ButtonType.Normal,
		},
		SA3: {
			label: "Super Art 3",
			cssClass: "sa3",
			buttonType: ButtonType.Normal,
		},
	},
	gameName: "SF6",
};
