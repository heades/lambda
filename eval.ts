import * as Syntax from "./syntax";
import * as Pretty from "./pretty";

function subst(t1: Syntax.Term, v: string, t2: Syntax.Term): Syntax.Term {
    switch (t2.kind) {
        case "var":
            if (t2.name == v) {
                return t1;
            } else {
                return t2;
            }
        case "lambda":
            // If the binder matches the variable we are replacing,
            // then do nothing to it.  Otherwise, substitute into the
            // body of the lambda keeping the structure the same.
            if (t2.name == v) {
                process.stdout.write(`Warning: alpha-conversion is not implemented, so no reduction was done.\nTerm: ${Pretty.pretty(t1)} ${Pretty.pretty(t2)}.`)
                return Syntax.mkApp(t1, t2);
            } else {
                return Syntax.mkLam(t2.name, subst(t1, v, t2.body))
            }
        case "application":
            return Syntax.mkApp(subst(t1, v, t2.head), subst(t1, v, t2.tail))
    }
}

export function evalTerm(t: Syntax.Term): Syntax.Term {
    switch (t.kind) {
        case "var":
            return t;
        case "lambda":
            return Syntax.mkLam(t.name, evalTerm(t.body));
        case "application":
            let hd = evalTerm(t.head);
            let tl = t.tail;
            switch (hd.kind) {
                case "lambda":
                    // We have a beta-redex, so reduce and continue evaluating.
                    return evalTerm(subst(tl, hd.name, hd.body));
                default:
                    return Syntax.mkApp(hd, tl);

            }
    }
}


