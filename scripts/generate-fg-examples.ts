import { Project, Node, SyntaxKind, CallExpression, Block } from "ts-morph";
import { writeFileSync } from "fs";
import { resolve } from "path";

const TEST_FILE = resolve("src/fg-parser.test.ts");
const OUT_FILE = resolve("fg-examples.md");

const project = new Project({ skipAddingFilesFromTsConfig: true });
const sourceFile = project.addSourceFileAtPath(TEST_FILE);

/** Return the block body of a describe/it callback, or null. */
function getCallbackBlock(callExpr: CallExpression): Block | null {
  const args = callExpr.getArguments();

  const last = args.at(-1);
  if (!last) {
    return null;
  }

  if (Node.isArrowFunction(last) || Node.isFunctionExpression(last)) {
    const body = last.getBody();
    if (Node.isBlock(body)) {
      return body;
    }
  }

  return null;
}

/** Return the literal string value of the first argument, or null. */
function firstStringArg(callExpr: CallExpression): string | null {
  const arg = callExpr.getArguments().at(0);
  return Node.isStringLiteral(arg) ? arg.getLiteralValue() : null;
}

/**
 * Return all call expressions that are direct expression-statements in a
 * block whose callee matches one of the given names.
 */
function directCalls(block: Block, ...names: string[]): CallExpression[] {
  const results: CallExpression[] = [];

  for (const stmt of block.getStatements()) {
    if (!Node.isExpressionStatement(stmt)) {
      continue;
    }

    const expr = stmt.getExpression();
    if (!Node.isCallExpression(expr)) {
      continue;
    }

    if (names.includes(expr.getExpression().getText())) {
      results.push(expr);
    }
  }
  return results;
}

/**
 * Collect the string argument of every parser.parseLine() / parseFgSource()
 * call found anywhere inside a given node.
 */
function collectParseInputs(node: Node): string[] {
  return node
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .flatMap((call) => {
      const callee = call.getExpression();
      if (!Node.isPropertyAccessExpression(callee)) return [];
      if (callee.getExpression().getText() !== "parser") return [];
      const method = callee.getName();
      if (method !== "parseLine" && method !== "parseFgSource") return [];
      const arg = call.getArguments()[0];
      if (!arg || !Node.isStringLiteral(arg)) return [];
      return [arg.getLiteralValue()];
    });
}

interface ItExample {
  itDesc: string;
  inputs: string[];
}

/** sectionName → Array<ItExample> */
const sections = new Map<string, ItExample[]>();

// Find describe("FgParser", ...) at the top level of the file
let fgParserDescribe: CallExpression | undefined;
for (const stmt of sourceFile.getStatements()) {
  if (!Node.isExpressionStatement(stmt)) {
    continue;
  }

  const expr = stmt.getExpression();
  if (!Node.isCallExpression(expr)) {
    continue;
  }

  if (expr.getExpression().getText() === "describe" && firstStringArg(expr) === "FgParser") {
    fgParserDescribe = expr;
    break;
  }
}

if (!fgParserDescribe) {
  console.error('Could not find describe("FgParser", ...) in test file.');
  process.exit(1);
}

const fgParserBlock = getCallbackBlock(fgParserDescribe);
if (!fgParserBlock) {
  console.error("Could not find body of FgParser describe block.");
  process.exit(1);
}

for (const sectionCall of directCalls(fgParserBlock, "describe")) {
  const sectionName = firstStringArg(sectionCall);
  if (!sectionName) {
    continue;
  }

  const sectionBlock = getCallbackBlock(sectionCall);
  if (!sectionBlock) {
    continue;
  }

  if (!sections.has(sectionName)) {
    sections.set(sectionName, []);
  }

  for (const itCall of directCalls(sectionBlock, "it")) {
    const itDesc = firstStringArg(itCall);
    if (!itDesc) {
      continue;
    }

    const inputs = collectParseInputs(itCall);
    if (inputs.length === 0) {
      continue;
    }

    const section = sections.get(sectionName);
    if (!section) {
      throw new Error(`Unknown section: "${sectionName}"`);
    }

    section.push({ itDesc, inputs });
  }
}

const out: string[] = [
  "# FgParser Examples",
  "",
  `_Auto-generated from \`src/fg-parser.test.ts\`._`,
  "",
];

for (const [section, entries] of sections) {
  if (entries.length === 0) continue;
  out.push(`## ${section}`, "");
  for (const { itDesc, inputs } of entries) {
    out.push(`### ${itDesc}`, "");
    for (const input of inputs) {
      out.push("```fg", input, "```", "");
    }
  }
}

writeFileSync(OUT_FILE, out.join("\n"));
console.log(`Generated ${OUT_FILE}`);
