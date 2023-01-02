export interface Just<T> {
    kind: "just"
    value: T
}

export function mkJust<T>(e: T): Just<T> {
    return { kind: "just", value: e }
}

export interface Nothing {
    kind: "nothing"
}

export function mkNothing(): Nothing {
    return { kind: "nothing" }
}

export type Maybe<T> = Just<T> | Nothing
