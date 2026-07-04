import { ThrowInputlabel } from "types";
import { ButtonData, ButtonType } from "symbol-data";
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
			id: "",
		},
		MP: {
			label: "MP",
			cssClass: "mp",
			svg: MP_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		HP: {
			label: "HP",
			cssClass: "hp",
			svg: HP_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		LK: {
			label: "LK",
			cssClass: "lk",
			svg: LK_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		MK: {
			label: "MK",
			cssClass: "mk",
			svg: MK_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		HK: {
			label: "HK",
			cssClass: "hk",
			svg: HK_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		PP: {
			label: "PP",
			cssClass: "pp",
			svg: LP_SVG + MP_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		KK: {
			label: "KK",
			cssClass: "kk",
			svg: LK_SVG + MK_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		PPP: {
			label: "PPP",
			cssClass: "ppp",
			svg: LP_SVG + MP_SVG + HP_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		KKK: {
			label: "KKK",
			cssClass: "kkk",
			svg: LK_SVG + MK_SVG + HK_SVG,
			buttonType: ButtonType.Normal,
			id: "",
		},
		DR: {
			label: "DR",
			cssClass: "dr",
			buttonType: ButtonType.Special,
			id: "",
		},
		DRC: {
			label: "DRC",
			cssClass: "drc",
			buttonType: ButtonType.Special,
			id: "",
		},
		DI: {
			label: "DI",
			cssClass: "di",
			buttonType: ButtonType.Special,
			id: "",
		},
		j: {
			label: "JUMP",
			cssClass: "jump",
			buttonType: ButtonType.Normal,
			id: "",
		},
		OR: {
			label: "OR",
			cssClass: "or",
			buttonType: ButtonType.Normal,
			id: "",
		},
		TIGER_KNEE: {
			label: "Tiger Knee",
			cssClass: "tk",
			buttonType: ButtonType.Normal,
			id: "",
		},
		CLOSE: {
			label: "CLOSE",
			cssClass: "close",
			buttonType: ButtonType.Normal,
			id: "",
		},
		FAR: {
			label: "FAR",
			cssClass: "far",
			buttonType: ButtonType.Normal,
			id: "",
		},
		DELAY: {
			label: "DELAY",
			cssClass: "delay",
			buttonType: ButtonType.Normal,
			id: "",
		},
		THROW: {
			label: ThrowInputlabel,
			cssClass: "throw",
			buttonType: ButtonType.Normal,
			id: "",
		},
		SA1: {
			label: "Super Art 1",
			cssClass: "sa1",
			buttonType: ButtonType.Modifier,
			id: "SA1",
		},
		SA2: {
			label: "Super Art 2",
			cssClass: "sa2",
			buttonType: ButtonType.Normal,
			id: "",
		},
		SA3: {
			label: "Super Art 3",
			cssClass: "sa3",
			buttonType: ButtonType.Normal,
			id: "",
		},
	},
	modifierData: {
		"[CH]": {
			label: "CH",
			cssClass: "ch",
			buttonType: ButtonType.Modifier,
			id: "ch",
		},
		"[PC]": {
			label: "PC",
			cssClass: "pc",
			buttonType: ButtonType.Modifier,
			id: "pc",
		},
		WALLSPLAT: {
			label: "WALLSPLAT",
			cssClass: "wallsplat",
			buttonType: ButtonType.Modifier,
			id: "wallsplat",
		},
	},
	gameName: "SF6",
};
