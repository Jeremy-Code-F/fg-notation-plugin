import { ButtonData } from "./symbol-data";

export interface GameConfig {
	/** Regex fragment (no anchors) matching valid button strings in directional inputs, e.g. "[LMH][PK]|PP|KK" */
	buttonPattern: string;
	/** Regex matching standalone badge tokens, e.g. /^(DRC|DR|DI|THROW)$/ */
	standaloneBadgeRe: RegExp;
	/** Regex matching bracketed modifier badge tokens, e.g. /^(\[CH\]|\[PC\])$/ */
	modifierBadgeRe: RegExp;
	/** Map from raw button string to display data */
	buttonData: Record<string, ButtonData>;
}
