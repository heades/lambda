import * as Syntax from "./syntax";
import * as Pretty from "./pretty";
import * as Parser from "./parser";
import * as Eval   from "./eval";
import * as Maybe  from "./maybe";

// System imports:
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function repl(): Promise<any> {
    let rl = readline.createInterface({ input, output });

    let cmd = await rl.question('lambda> ');    

    // Handle the input command:
    switch (cmd) {
        case ":q":
            rl.close()
            return;

        default:        
            let parser = new Parser.Parser();
            let maybeTerm: Maybe.Maybe<Syntax.Term> = parser.parseTerm(cmd);
          
            switch (maybeTerm.kind) {
                case "just":
                    console.log(Pretty.pretty(Eval.evalTerm(maybeTerm.value)));
                    break;
                    
                case "nothing":
                    console.log("Parse error");                    
            }
            rl.close();
            return repl();
    }
}
