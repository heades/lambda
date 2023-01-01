import * as Syntax from "./syntax";

const fs = require('fs');
const ohm = require('ohm-js');
const contents = fs.readFileSync('Grammar.ohm', 'utf-8');
const grammar = ohm.grammar(contents);

console.log(grammar.match("fun x { x }", "term").succeeded())
