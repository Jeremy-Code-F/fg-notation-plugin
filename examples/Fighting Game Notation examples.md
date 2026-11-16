# Fighting Game Notation examples

A reference for the **Fighting Game Notation** plugin. Copy this note into your vault to see every kind of notation rendered. Each section has a table of what to type, followed by a block that renders the same items in the same order, one per line.

To see the text behind any block, click into it (or switch to source mode).

Use ` ```fg-sf6 ` (or just ` ```fg `) to start a Street Fighter 6 block.

---

## Directions

Directions use numpad notation, where `5` is neutral.

| Type | Direction |
|---|---|
| `1HP` | Down-back |
| `2HP` | Down |
| `3HP` | Down-forward |
| `4HP` | Back |
| `5HP` | Neutral |
| `6HP` | Forward |

```fg-sf6
1HP
2HP
3HP
4HP
5HP
6HP
```

---

## Motions

| Type | Motion |
|---|---|
| `236LP` | Quarter-circle forward |
| `214LP` | Quarter-circle back |
| `623LP` | Dragon punch |
| `421LP` | Reverse dragon punch |
| `41236LP` | Half-circle forward |
| `63214LP` | Half-circle back |
| `236236PP` | Double quarter-circle forward |
| `214214PP` | Double quarter-circle back |
| `646PP` | Charge super (forward, back, forward) |
| `22PP` | Down, down |

```fg-sf6
236LP
214LP
623LP
421LP
41236LP
63214LP
236236PP
214214PP
646PP
22PP
```

A `.` between the motion and the button is optional. These two render the same:

```fg-sf6
236.LP
236LP
```

---

## Buttons

| Type | Button |
|---|---|
| `5LP` `5MP` `5HP` | Light, medium, heavy punch |
| `5LK` `5MK` `5HK` | Light, medium, heavy kick |
| `236PP` `236KK` | Two punches or two kicks (e.g. OD moves) |
| `236236PPP` `236236KKK` | All three punches or kicks |
| `THROW` | Throw |

```fg-sf6
5LP 5MP 5HP
5LK 5MK 5HK
236PP 236KK
236236PPP 236236KKK
THROW
```

---

## Prefixes

| Type | Meaning |
|---|---|
| `j.HP` | Jumping |
| `c.HP` | Close |
| `f.HP` | Far |
| `d.2MK` | Delayed |
| `tk.236LK` | Tiger knee |

```fg-sf6
j.HP
c.HP
f.HP
d.2MK
tk.236LK
```

---

## Separators

| Type | Meaning |
|---|---|
| `2LP > 236HP` | Cancel |
| `2LP , 5MP` | Link |
| `2LP ~ 2LP` | Chain |
| `LP+LK` | Pressed together |
| `5HP / 2HP` | Or (alternative route) |

```fg-sf6
2LP > 236HP
2LP , 5MP
2LP ~ 2LP
LP+LK
5HP / 2HP
```

---

## Charge inputs

Put the held direction in brackets, followed by the release direction.

| Type | Meaning |
|---|---|
| `[4]6HP` | Hold back, then forward + HP |
| `[2]8KK` | Hold down, then up + KK |
| `[1]6LP` | Hold down-back, then forward + LP |

```fg-sf6
[4]6HP
[2]8KK
[1]6LP
```

---

## Tiger knee

A tiger knee motion ends in an upward direction, usually to do a special move just off the ground. Write it with the `tk.` prefix, or add the up direction to the motion yourself. Each pair below renders the same.

| Type | Meaning |
|---|---|
| `tk.236LK` or `2369LK` | Quarter-circle forward, then up-forward |
| `tk.214LK` or `2147LK` | Quarter-circle back, then up-back |

```fg-sf6
tk.236LK
2369LK
tk.214LK
2147LK
```

---

## Grapplers

Full-circle motions work like any other motion, on the ground, in the air or as a tiger knee.

| Type | Meaning |
|---|---|
| `360PP` | Full circle |
| `720PPP` | Double full circle |
| `j.360KK` | Full circle in the air |
| `tk.360LP` | Tiger knee full circle |

```fg-sf6
360PP
720PPP
j.360KK
tk.360LP
```

---

## Dashes and microwalk

| Type | Meaning |
|---|---|
| `66` | Forward dash |
| `44` | Back dash |
| `j.66` | Air dash |
| `microwalk` | Microwalk (any capitalization) |

```fg-sf6
66
44
j.66
microwalk
```

---

## Badges

These can appear anywhere in a line.

| Type | Meaning |
|---|---|
| `DR` | Drive Rush |
| `DRC` | Drive Rush cancel |
| `DI` | Drive Impact |
| `SA1` `SA2` `SA3` | Super Art 1–3 (also `[SA1]` `[SA2]` `[SA3]`) |
| `[CH]` | Counter hit |
| `[PC]` | Punish counter |
| `WALLSPLAT` | Wall splat |

```fg-sf6
DR
DRC
DI
SA1 SA2 SA3
[CH]
[PC]
WALLSPLAT
```

---

## Full combos

Put it all together. Each line is its own combo.

```fg-sf6
2MK > 236HP
[PC] 2MK > DRC 5HP > 236HP
j.HP , 2MP > DRC 5HP > [4]6HP > SA3
DI , WALLSPLAT 5HP > 623PP
microwalk 2MK > 236HP
66 > 5HP > 236236PPP
2LP , 2LP / 2LP , 5LP > 214PP
c.HP > SA2
```

Anything the plugin doesn't recognize is shown as plain text, so a typo never breaks the rest of the line.
