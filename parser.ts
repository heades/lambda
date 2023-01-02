import * as Syntax from "./syntax";
import * as Maybe from "./maybe";

const fs = require('fs');
const ohm = require('ohm-js');
const contents = fs.readFileSync('Grammar.ohm', 'utf-8');
const grammar = ohm.grammar(contents);

export function parseTerm(e: string): Maybe.Maybe<Syntax.Term> {
    let matcher = grammar.match(e, "term");

    if (matcher.succeeded()) {
        // Parse e into a term t and return that.
        return Maybe.mkJust(Syntax.mkVar("x"))
    } else {
        return Maybe.mkNothing()
    }
}

console.log(grammar.match("(fun x { x y }) z", "term").succeeded())
