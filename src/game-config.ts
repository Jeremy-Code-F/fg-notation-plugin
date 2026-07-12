import { ButtonData } from "./symbol-data";

export interface GameConfig {
	/** Map from raw button string to display data */
	inputData: Record<string, ButtonData>;
	modifierData: Record<string, ButtonData>;
	gameName: string;
}
