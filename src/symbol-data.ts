import { Button, Direction, Separator } from "./types";
import {
	LP_SVG, MP_SVG, HP_SVG,
	LK_SVG, MK_SVG, HK_SVG,
	CANCEL_SVG, CHAIN_SVG, LINK_SVG,
} from "./icons";

export type ButtonData = {
	label: string;
	cssClass: string;
	svg?: string;
};

export type DirectionData = {
	arrows: string;
};

export type SeparatorData = {
	label: string;
	cssClass: string;
	svg?: string;
};

export const BUTTON_DATA: Record<Button, ButtonData> = {
	[Button.LightPunch]:      { label: "LP",    cssClass: "lp",    svg: LP_SVG },
	[Button.MediumPunch]:     { label: "MP",    cssClass: "mp",    svg: MP_SVG },
	[Button.HeavyPunch]:      { label: "HP",    cssClass: "hp",    svg: HP_SVG },
	[Button.LightKick]:       { label: "LK",    cssClass: "lk",    svg: LK_SVG },
	[Button.MediumKick]:      { label: "MK",    cssClass: "mk",    svg: MK_SVG },
	[Button.HeavyKick]:       { label: "HK",    cssClass: "hk",    svg: HK_SVG },
	[Button.DoublePunch]:     { label: "PP",    cssClass: "pp",    svg: LP_SVG + MP_SVG },
	[Button.DoubleKick]:      { label: "KK",    cssClass: "kk",    svg: LK_SVG + MK_SVG },
	[Button.TriplePunch]:     { label: "PPP",   cssClass: "ppp",   svg: LP_SVG + MP_SVG + HP_SVG },
	[Button.TripleKick]:      { label: "KKK",   cssClass: "kkk",   svg: LK_SVG + MK_SVG + HK_SVG },
	[Button.DriveRush]:       { label: "DR",    cssClass: "dr" },
	[Button.DriveRushCancel]: { label: "DRC",   cssClass: "drc" },
	[Button.DriveImpact]:     { label: "DI",    cssClass: "di" },
	[Button.CounterHit]:      { label: "CH",    cssClass: "ch" },
	[Button.PunishCounter]:   { label: "PC",    cssClass: "pc" },
	[Button.THROW]:           { label: "THROW", cssClass: "throw" },
};

export const DIRECTION_DATA: Record<Direction, DirectionData> = {
	[Direction.DownBack]:                { arrows: "↙" },
	[Direction.Down]:                    { arrows: "↓" },
	[Direction.DownForward]:             { arrows: "↘" },
	[Direction.Back]:                    { arrows: "←" },
	[Direction.Neutral]:                 { arrows: "" },
	[Direction.Forward]:                 { arrows: "→" },
	[Direction.UpBack]:                  { arrows: "↖" },
	[Direction.Up]:                      { arrows: "↑" },
	[Direction.UpForward]:               { arrows: "↗" },
	[Direction.Jump]:                    { arrows: "JUMP" },
	[Direction.DoubleQuarterCircleForward]: { arrows: "↓↘→↓↘→" },
	[Direction.QuarterCircleForward]:    { arrows: "↓↘→" },
	[Direction.QuarterCircleBack]:       { arrows: "↓↙←" },
	[Direction.ChargeSuper]:             { arrows: "→←→" },
	[Direction.DragonPunch]:             { arrows: "→↓↘" },
	[Direction.ReverseDragonPunch]:      { arrows: "←↓↙" },
	[Direction.HalfCircleForward]:       { arrows: "←↙↓↘→" },
	[Direction.HalfCircleBack]:          { arrows: "→↘↓↙←" },
	[Direction.DoubleDown]:              { arrows: "↓↓" },
	[Direction.DoubleTapForward]:        { arrows: "→→" },
	[Direction.DoubleTapBack]:           { arrows: "←←" },
};

export const SEPARATOR_DATA: Record<Separator, SeparatorData> = {
	[Separator.Cancel]: { label: ">", cssClass: "cancel", svg: CANCEL_SVG },
	[Separator.Chain]:  { label: "~", cssClass: "chain",  svg: CHAIN_SVG },
	[Separator.Link]:   { label: ",", cssClass: "link",   svg: LINK_SVG },
};
