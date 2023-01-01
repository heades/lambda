import * as Syntax from "./syntax";

function addParens(t: Syntax.Term): string {
    if (t.kind == "lambda" || t.kind == "application") {
        return `(${pretty(t)})`;
    } else {
        return pretty(t);
    }
}

export function pretty(t: Syntax.Term): string {
    switch (t.kind) {
        case "var":
            return t.name;
        case "lambda":
            return `fun ${t.name} {${pretty(t.body)}}`;
        case "application":
            return `${addParens(t.head)} ${addParens(t.tail)}`;
    }
}

const omega: Syntax.Term = Syntax.mkApp(Syntax.mkLam("x", Syntax.mkApp(Syntax.mkVar("x"), Syntax.mkVar("x"))), Syntax.mkLam("x", Syntax.mkApp(Syntax.mkVar("x"), Syntax.mkVar("x"))));

