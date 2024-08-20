import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const packages = ['react', 'utils'];

const INDENT = '    ';

const isExportedDeclaration = (node: ts.Node): boolean => {
    if (
        ts.isVariableStatement(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node)
    )
        return (
            node.modifiers !== undefined &&
            node.modifiers.some(
                (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
            )
        );

    return false;
};

const findDescendantArrowFunction = (node: ts.Node): ts.Node | null => {
    if (ts.isArrowFunction(node)) return node;

    return ts.forEachChild(node, findDescendantArrowFunction) || null;
};

const isFunction = (node: ts.Node) =>
    ts.isFunctionDeclaration(node) ||
    Boolean(findDescendantArrowFunction(node));

export const getNodeName = (node: ts.Node) =>
    node
        .getText()
        .split('\n')
        .filter(Boolean)[0]
        .split('(')[0]
        .split(':')[0]
        .split('=')[0]
        .trim()
        .split(' ')
        .pop() || null;

export const getJsDocInfo = (node: ts.Node): [string, string] | null => {
    if (node.getChildCount() < 2) return null;

    const type = node.getChildren()[1].getText();
    const description = node
        .getText()
        .split(`${type} -`)[1]
        .split('\n')[0]
        .trim();
    return [type, description];
};

function generateReadme() {
    packages.forEach((pkg) => {
        const pkgPath = path.join(__dirname, '..', 'packages', pkg);
        const indexPath = path.join(pkgPath, 'src', 'index.ts');

        console.log('\n-------------', 'Parsing', pkg, '-------------\n');

        let packageContent = `## @wakeupingear/${pkg}\n\n`;
        const types: string[] = [];
        const functions: string[] = [];
        const components: string[] = [];
        const variables: string[] = [];

        const aboutPath = path.join(pkgPath, 'ABOUT.md');
        if (fs.existsSync(aboutPath)) {
            const aboutContent = fs.readFileSync(aboutPath, 'utf8');
            packageContent += aboutContent + '\n';
        }

        const program = ts.createProgram([indexPath], {
            jsx: ts.JsxEmit.React,
        });
        const sourceFile = program.getSourceFile(indexPath);
        const checker = program.getTypeChecker();

        if (sourceFile) {
            ts.forEachChild(sourceFile, (node) => {
                if (
                    ts.isExportDeclaration(node) ||
                    ts.isExportAssignment(node)
                ) {
                    console.log('CHECKING', node.getChildren()[1].getText());

                    let symbolName: string | null = null;
                    if (node.getChildren()[1].getText() !== '*') {
                        symbolName = node
                            .getChildren()[1]
                            .getChildren()[1]
                            .getChildren()[0]
                            .getChildren()[2]
                            .getText()
                            .trim();
                        console.log(`${INDENT}Parsing ${symbolName}`);
                    } else console.log(`${INDENT}Parsing all symbols`);

                    (
                        checker
                            .getSymbolAtLocation(node.getChildren()[3])
                            ?.declarations?.[0]?.getChildren()[0]
                            ?.getChildren() || []
                    ).forEach((child, i) => {
                        if (isExportedDeclaration(child)) {
                            let innerNode = child;
                            if (
                                ts.isExportDeclaration(innerNode) ||
                                ts.isExportAssignment(innerNode)
                            )
                                innerNode = innerNode.getChildren()[0];

                            const isTsx = innerNode
                                .getSourceFile()
                                .fileName.endsWith('.tsx');
                            const name = getNodeName(innerNode);
                            if (
                                !symbolName ||
                                (name === symbolName &&
                                    innerNode.getText().includes(symbolName))
                            ) {
                                console.log(`${INDENT}Valid symbol ${name}`);
                            } else return;

                            let text = `### \`${
                                isTsx ? `<${name} />` : name
                            }\``;
                            const jsdoc = innerNode
                                .getChildren()
                                .find(
                                    (child) =>
                                        child.kind === ts.SyntaxKind.JSDoc
                                );
                            if (jsdoc) {
                                console.log(`${INDENT}${INDENT}Found jsdoc`);

                                text += `\n${jsdoc
                                    .getText()
                                    .split('@')[0]
                                    .split('\n')
                                    .map((line) =>
                                        line
                                            .replace('*', '')
                                            .replace('/*', '')
                                            .replace('*/', '')
                                            .trim()
                                    )
                                    .filter(Boolean)
                                    .join('\n')
                                    .trim()}`;

                                const params: string[] = [];
                                let returnText: string | null = null;
                                jsdoc.getChildren().forEach((child, i) => {
                                    if (
                                        child.kind ===
                                        ts.SyntaxKind.JSDocParameterTag
                                    ) {
                                        const info = getJsDocInfo(child);
                                        if (info)
                                            params.push(
                                                `* \`${info[0]}\` - ${info[1]}`
                                            );
                                    } else if (
                                        child.kind ===
                                        ts.SyntaxKind.JSDocReturnTag
                                    ) {
                                        returnText = child
                                            .getText()
                                            .split(' ')
                                            .slice(1)
                                            .join(' ');
                                    }
                                });

                                if (params.length) {
                                    console.log(
                                        `${INDENT}${INDENT}Found ${params.length} params`
                                    );
                                    text += `\n\n#### Params\n\n${params
                                        .sort()
                                        .join('\n')}`;
                                }

                                if (returnText) {
                                    console.log(
                                        `${INDENT}${INDENT}Found return type`
                                    );
                                    text += `\n\n#### Returns\n\n${returnText}`;
                                }
                            }

                            if (isFunction(innerNode)) {
                                if (isTsx) components.push(text);
                                else functions.push(text);
                            } else if (ts.isVariableStatement(innerNode)) {
                                variables.push(text);
                            } else if (ts.isTypeAliasDeclaration(innerNode)) {
                                types.push(text);
                            }
                        }
                    });
                }
            });

            if (
                types.length ||
                functions.length ||
                variables.length ||
                components.length
            )
                packageContent += '\n';
            if (components.length)
                packageContent += `## Components\n\n${components
                    .sort()
                    .join('\n\n')}\n\n`;
            if (functions.length)
                packageContent += `## Functions\n\n${functions
                    .sort()
                    .join('\n\n')}\n\n`;
            if (variables.length)
                packageContent += `## Variables\n\n${variables
                    .sort()
                    .join('\n\n')}\n\n`;
            if (types.length)
                packageContent += `## Types\n\n${types
                    .sort()
                    .join('\n\n')}\n\n`;
        }

        packageContent += '\n\n(file autogenerated w/ jsdoc reflection :D)';

        fs.writeFileSync(path.join(pkgPath, 'README.md'), packageContent);
    });
}

generateReadme();
