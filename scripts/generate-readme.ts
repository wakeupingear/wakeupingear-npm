import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const packages = ['react', 'utils'];

function generateReadme() {
    packages.forEach((pkg) => {
        const pkgPath = path.join(__dirname, '..', 'packages', pkg);
        const indexPath = path.join(pkgPath, 'src', 'index.ts');

        let packageContent = `## @wakeupingear/${pkg}\n\n`;

        const aboutPath = path.join(pkgPath, 'ABOUT.md');
        if (fs.existsSync(aboutPath)) {
            const aboutContent = fs.readFileSync(aboutPath, 'utf8');
            packageContent += aboutContent;
        }

        const program = ts.createProgram([indexPath], {});
        const sourceFile = program.getSourceFile(indexPath);

        if (sourceFile) {
            ts.forEachChild(sourceFile, (node) => {
                if (
                    ts.isExportDeclaration(node) ||
                    ts.isExportAssignment(node)
                ) {
                    const symbol = program
                        .getTypeChecker()
                        .getSymbolAtLocation(node.getChildren()[1]);
                    if (symbol) {
                        const declaration = symbol.declarations?.[0];
                        if (
                            declaration &&
                            ts.isFunctionDeclaration(declaration)
                        ) {
                            const name = declaration.name?.getText();
                            const docs = ts.displayPartsToString(
                                symbol.getDocumentationComment(
                                    program.getTypeChecker()
                                )
                            );
                            packageContent += `### ${name}\n\n${docs}\n\n`;
                        }
                    }
                }
            });
        }

        fs.writeFileSync(path.join(pkgPath, 'README.md'), packageContent);
    });
}

generateReadme();
