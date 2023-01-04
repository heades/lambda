import * as Syntax from "./syntax";
import * as Pretty from "./pretty";
import * as Maybe from "./maybe";

const fs = require('fs');
const ohm = require('ohm-js');

export class Parser {
    private contents = fs.readFileSync('Grammar.ohm', 'utf-8');
    private grammar = ohm.grammar(this.contents);
    private semantics = this.grammar.createSemantics();

    constructor() {
        this.semantics.addOperation('getADT', {
            literal(e: any) {
                return this.sourceString;
            },
            varName(e1: any, e2: any) {
                return Syntax.mkVar(this.sourceString);
            },
            lambda(x: any, s1: any, binder: any, s2: any, p1: any, s3: any, body: any, s4: any, p2: any) {
                return Syntax.mkLam(binder.getADT().name, body.getADT());
            },
            tail_application(tl: any, s: any, t: any) {
                return Syntax.mkApp(tl.getADT(), t.getADT());
            },
            tail_parens(p1: any, s1: any, t: any, s2: any, p2: any) {
                return t.getADT();
            },
            term_application(tl: any, s: any, t: any) {
                return Syntax.mkApp(tl.getADT(), t.getADT());
            },
            term_parens(p1: any, s1: any, t: any, s2: any, p2: any) {
                return t.getADT();
            }
        });
    }

    parseTerm(e: string): Maybe.Maybe<Syntax.Term> {
        let matcher = this.grammar.match(e, "term");

        if (matcher.succeeded()) {
            // Parse e into a term t and return that.
            let s = this.semantics(matcher).getADT();

            return Maybe.mkJust(s);
        } else {
            return Maybe.mkNothing();
        }
    }
}

let parser = new Parser();
let tk: Maybe.Maybe<Syntax.Term> = parser.parseTerm("(fun x { x y }) z");

switch (tk.kind) {
    case "just":
        console.log(Pretty.pretty(tk.value));
        break;

    case "nothing":
        console.log("Parse error");
}
