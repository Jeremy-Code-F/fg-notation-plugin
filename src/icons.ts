/*!
 * Separator icons are from Lucide (https://lucide.dev): cancel is
 * "chevron-right", link is "link-2", together is "plus", and chain is the
 * middle wave of "waves".
 *
 * ISC License
 * Copyright (c) 2026 Lucide Icons and Contributors
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 */

function lucideIcon(body: string): string {
	return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

export const CANCEL_SVG = lucideIcon(`<path d="m9 18 6-6-6-6"/>`);
export const CHAIN_SVG = lucideIcon(`<path d="M2 12q2.5 2 5 0t5 0 5 0 5 0"/>`);
export const LINK_SVG = lucideIcon(
	`<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>`,
);
export const TOGETHER_SVG = lucideIcon(`<path d="M5 12h14"/><path d="M12 5v14"/>`);

// Punch and kick shapes are by Lorc (https://lorcblog.blogspot.com) from
// game-icons.net, licensed CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/).
// The fist is taken from "Punch blast" without its blast outline, and the
// foot is "Footprint". Both are placed on a colored circle per strength.

// Fist from Lorc's "Punch blast"
const FIST_PATH = "M202.15 135.336c16.1.356 25.565 12.198 34.666 24.678L177.312 263.08c-20.422 1.985-35.31-4.577-41.787-24.123l59.51-103.074c1.93-.326 3.772-.503 5.537-.545.534-.013 1.06-.014 1.578-.002zm69.037 11.197c16.1.352 25.567 12.2 34.668 24.676L238.947 290.24c-20.423 1.985-35.31-4.586-41.785-24.127l66.91-119.03c1.93-.327 3.772-.507 5.537-.55.533-.013 1.058-.013 1.577-.002zm58.704 32.05c16.102.357 25.567 12.198 34.67 24.673l-65.945 117.547c-20.423 1.98-35.31-4.58-41.783-24.123l65.94-117.55c1.93-.325 3.773-.502 5.54-.544.532-.013 1.06-.013 1.58-.002zm46.342 55.233c16.773.098 26.746 11.977 36.354 24.485l-55.557 96.227c-20.026 1.297-34.856-5.367-41.786-24.125l55.56-96.224c1.887-.255 3.693-.372 5.428-.362zM127.55 271.713l105.83 47.52c3.015 21.69-2.782 38.788-21.958 48.91L105.588 320.62c-4.508-21.618 8.273-35.485 21.96-48.907z";

// Lorc's "Footprint", scaled down to sit inside the circle
const FOOT_PATH = "M246.625 18.375c-11.817-.153-23.918 8.608-29.375 22.438-6.716 17.02-.85 35.28 13.094 40.78 13.943 5.502 30.69-3.822 37.406-20.843 6.716-17.02.85-35.28-13.094-40.78a22.512 22.512 0 0 0-8.03-1.595zm74.75 15.938c-10.97.006-22.743 6.024-30.78 16.874-12.25 16.534-11.2 38.06 2.342 48.094 13.544 10.035 34.44 4.754 46.688-11.78 12.25-16.534 11.2-38.06-2.344-48.094-4.654-3.45-10.16-5.097-15.905-5.093zm67.25 37.53c-10.336-.127-21.542 4.263-30.47 12.907-15.87 15.368-18.525 38.344-5.936 51.344 12.587 13 35.66 11.086 51.53-4.28 15.87-15.37 18.526-38.345 5.938-51.345-5.508-5.69-13.024-8.527-21.063-8.626zm-156.438 32.063c-22.51-.28-44.378 6.893-63.5 24C107.65 182.513 48.192 261.012 28.28 386.97 5.023 534.1 186.257 507.523 168.313 428.936c-22.922-100.387 34.13-141.11 108-124.156 32.838 7.54 66.54-4.9 86-40.436 23.402-42.733-7.428-106.817-62.875-139.625-21.61-12.79-44.74-20.534-67.25-20.814zM449.438 134c-10.52.022-21.654 2.82-32.093 8.625-27.837 15.48-40.15 46.51-27.47 69.313 12.682 22.802 45.54 28.73 73.376 13.25 27.837-15.48 40.118-46.51 27.438-69.313-7.926-14.252-23.717-21.91-41.25-21.875z";

const LIGHT = "#6EC6F0";
const MEDIUM = "#F5C518";
const HEAVY = "#E63946";

function buttonIcon(color: string, shape: string): string {
	return `<svg width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="256" fill="${color}"/>${shape}</svg>`;
}

const FIST = `<path fill="#ffffff" d="${FIST_PATH}"/>`;
const FOOT = `<path fill="#ffffff" transform="translate(256 256) scale(0.62) translate(-248 -262)" d="${FOOT_PATH}"/>`;

export const LP_SVG = buttonIcon(LIGHT, FIST);
export const MP_SVG = buttonIcon(MEDIUM, FIST);
export const HP_SVG = buttonIcon(HEAVY, FIST);

export const LK_SVG = buttonIcon(LIGHT, FOOT);
export const MK_SVG = buttonIcon(MEDIUM, FOOT);
export const HK_SVG = buttonIcon(HEAVY, FOOT);
