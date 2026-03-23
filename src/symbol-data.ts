import { Direction, Separator } from "./types";
import {
	CANCEL_SVG,
	CHAIN_SVG,
	LINK_SVG,
	TOGETHER_SVG,
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


export const DIRECTION_DATA: Record<Direction, DirectionData> = {
	[Direction.DownBack]: { arrows: "↙" },
	[Direction.Down]: { arrows: "↓" },
	[Direction.DownForward]: { arrows: "↘" },
	[Direction.Back]: { arrows: "←" },
	[Direction.Neutral]: { arrows: "" },
	[Direction.Forward]: { arrows: "→" },
	[Direction.UpBack]: { arrows: "↖" },
	[Direction.Up]: { arrows: "↑" },
	[Direction.UpForward]: { arrows: "↗" },
	[Direction.Jump]: { arrows: "JUMP" },
	[Direction.DoubleQuarterCircleForward]: { arrows: "↓↘→↓↘→" },
	[Direction.QuarterCircleForward]: { arrows: "↓↘→" },
	[Direction.QuarterCircleBack]: { arrows: "↓↙←" },
	[Direction.ChargeSuper]: { arrows: "→←→" },
	[Direction.DragonPunch]: { arrows: "→↓↘" },
	[Direction.ReverseDragonPunch]: { arrows: "←↓↙" },
	[Direction.HalfCircleForward]: { arrows: "←↙↓↘→" },
	[Direction.HalfCircleBack]: { arrows: "→↘↓↙←" },
	[Direction.DoubleDown]: { arrows: "↓↓" },
	[Direction.DoubleTapForward]: { arrows: "→→" },
	[Direction.DoubleTapBack]: { arrows: "←←" },
};

export const SEPARATOR_DATA: Record<Separator, SeparatorData> = {
	[Separator.Cancel]: { label: ">", cssClass: "cancel", svg: CANCEL_SVG },
	[Separator.Chain]: { label: "~", cssClass: "chain", svg: CHAIN_SVG },
	[Separator.Link]: { label: ",", cssClass: "link", svg: LINK_SVG },
	[Separator.Together]: { label: "+", cssClass: "together", svg: TOGETHER_SVG },
};
