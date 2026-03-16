import { Direction } from "types";

export const DIRECTION_ARROWS: Record<Direction, string> = {
	[Direction.DownBack]: "↙",
	[Direction.Down]: "↓",
	[Direction.DownForward]: "↘",
	[Direction.Back]: "←",
	[Direction.Neutral]: "",
	[Direction.Forward]: "→",
	[Direction.UpBack]: "↖",
	[Direction.Up]: "↑",
	[Direction.UpForward]: "↗",
	[Direction.Jump]: "JUMP",
	// Motions expanded into their component arrows
	[Direction.DoubleQuarterCircleForward]: "↓↘→↓↘→",
	[Direction.QuarterCircleForward]: "↓↘→",
	[Direction.QuarterCircleBack]: "↓↙←",
	[Direction.ChargeSuper]: "→←→",
	[Direction.DragonPunch]: "→↓↘",
	[Direction.ReverseDragonPunch]: "←↓↙",
	[Direction.HalfCircleForward]: "←↙↓↘→",
	[Direction.HalfCircleBack]: "→↘↓↙←",
	[Direction.DoubleDown]: "↓↓",
	[Direction.DoubleTapForward]: "→→",
	[Direction.DoubleTapBack]: "←←",
};
