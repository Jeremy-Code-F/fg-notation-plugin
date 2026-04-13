export enum Direction {
	// Single directions
	DownBack = "1",
	Down = "2",
	DownForward = "3",
	Back = "4",
	Neutral = "5",
	Forward = "6",
	UpBack = "7",
	Up = "8",
	UpForward = "9",
	Jump = "j",
	Close = "c",
	Far = "f",
	// Motion inputs
	DoubleQuarterCircleForward = "236236", // qcf qcf
	DoubleQuarterCircleBack = "214214", // qcb qcb 
	QuarterCircleForward = "236", // QCF / fireball
	ChargeSuper = "646", // Guile Sonic Hurricane for example
	QuarterCircleBack = "214", // QCB
	DragonPunch = "623", // DP / Shoryuken (Z-motion)
	ReverseDragonPunch = "421", // RDP
	HalfCircleForward = "41236", // HCF
	HalfCircleBack = "63214", // HCB
	FullCircle = "360",
	DoubleDown = "22", // double-tap down
	DoubleTapForward = "66", // dash forward
	DoubleTapBack = "44",
}


export enum Separator {
	Cancel = ">",
	Chain = "~",
	Link = ",",
	Together = "+",
}

export type InputToken = {
	kind: "input";
	direction: Direction;
	button: string;
	delayed?: boolean;
};
export type ChargeInputToken = {
	kind: "charge-input";
	charge: Direction;
	direction: Direction;
	button: string;
};
export type SeparatorToken = { kind: "separator"; separator: Separator };
export type BadgeToken = { kind: "badge"; button: string };
export type RawToken = { kind: "raw"; value: string };
export type FgToken =
	| InputToken
	| ChargeInputToken
	| SeparatorToken
	| BadgeToken
	| RawToken;
