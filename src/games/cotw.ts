import { GameConfig } from "../game-config";
import COTW_LP_PNG from "../assets/COTW-LP.png";
import COTW_HP_PNG from "../assets/COTW-HP.png";
import COTW_LK_PNG from "../assets/COTW-LK.png";
import COTW_HK_PNG from "../assets/COTW-HK.png";
import COTW_BRAKE_PNG from "../assets/COTW-BRAKE.png";
import COTW_FAINT_PNG from "../assets/COTW-FAINT.png";

// Icons from https://www.snk-corp.co.jp/webmanual/fatalfury-cotw/icon/?lang=en-US

const buttonPattern = "LP|HP|LK|HK|BRAKE|FAINT";

export const COTW_CONFIG: GameConfig = {
    buttonPattern,
    inputRe: new RegExp(`^(c\\.|f\\.|j\\.|[1-9]*)(${buttonPattern})$`),
    standaloneBadgeRe: /^(RC|Burst|THROW|RRC|YRC|66|WS|WB)$/,
    modifierBadgeRe: /^(\[CH\]|\[RISC\])$/,
    inputData: {
        LP: { label: "LP", cssClass: "cotw-lp", png: COTW_LP_PNG },
        HP: { label: "HP", cssClass: "cotw-hp", png: COTW_HP_PNG },
        LK: { label: "LK", cssClass: "cotw-lk", png: COTW_LK_PNG },
        HK: { label: "HK", cssClass: "cotw-hk", png: COTW_HK_PNG },
        BRAKE: { label: "BRAKE", cssClass: "cotw-brake", png: COTW_BRAKE_PNG },
        FAINT: { label: "FAINT", cssClass: "cotw-faint", png: COTW_FAINT_PNG },
    },
    gameName: "COTW",
};
