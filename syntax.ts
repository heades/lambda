export interface Var {
    kind: "var";
    name: string;
}

export function mkVar(n: string): Var {
    return {
        kind: "var",
        name: n
    }
}

export interface Lambda {
    kind: "lambda";
    name: string;
    body: Term;
}

export function mkLam(n: string, b: Term): Lambda {
    return {
        kind: "lambda",
        name: n,
        body: b
    }
}

export interface Application {
    kind: "application";
    head: Term;
    tail: Term;
}

export function mkApp(h: Term, t: Term): Application {
    return {
        kind: "application",
        head: h,
        tail: t
    }
}

export type Term = Var | Lambda | Application;

const var0: Term = mkVar("x");

const id_lam: Term = mkLam("x", mkVar("x"));

const omega: Term = mkApp(mkLam("x", mkApp(mkVar("x"), mkVar("x"))), mkLam("x", mkApp(mkVar("x"), mkVar("x"))));

