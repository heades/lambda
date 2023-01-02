import * as Syntax from "./syntax";

const fs = require('fs');
const ohm = require('ohm-js');
const contents = fs.readFileSync('Grammar.ohm', 'utf-8');
const grammar = ohm.grammar(contents);

interface Just<T> {
    kind: "just"
    value: T
}

function mkJust<T>(e: T): Just<T> {
    return { kind: "just", value: e }
}

interface Nothing {
    kind: "nothing"
}

function mkNothing(): Nothing {
    return { kind: "nothing" }
}

type Maybe<T> = Just<T> | Nothing

export function parseTerm(e: string): Maybe<Syntax.Term> {
    let matcher = grammar.match(e, "term");

    if (matcher.succeeded()) {
        // Parse e into a term t and return that.
        return mkJust(Syntax.mkVar("x"))
    } else {
        return mkNothing()
    }
}

console.log(grammar.match("(fun x { x y }) z", "term").succeeded())
