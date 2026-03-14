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
	// Motion inputs
	DoubleQuarterCircleForward = "236236", // qcf qcf
	QuarterCircleForward = "236", // QCF / fireball
	QuarterCircleBack = "214", // QCB
	DragonPunch = "623", // DP / Shoryuken (Z-motion)
	ReverseDragonPunch = "421", // RDP
	HalfCircleForward = "41236", // HCF
	HalfCircleBack = "63214", // HCB
	DoubleDown = "22", // double-tap down
	DoubleTapForward = "66", // dash forward
	DoubleTapBack = "44", // dash back
}

export enum Button {
	LightPunch = "LP",
	MediumPunch = "MP",
	HeavyPunch = "HP",
	LightKick = "LK",
	MediumKick = "MK",
	HeavyKick = "HK",
	DriveRush = "DR",
	DriveRushCancel = "DRC",
	DriveImpact = "DI",
	CounterHit = "CH",
	PunishCounter = "PC",
}

export enum Separator {
	Cancel = ">",
	Chain = "~",
	Link = ",",
}
