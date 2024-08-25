import fs from "fs";
import path from "path";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { Node } from "unist";

interface CodeNode extends Node {
  lang?: string;
  meta?: string;
  value: string;
}

const remarkCodeImport: Plugin = () => {
  return (tree) => {
    visit(tree, "code", (node: CodeNode) => {
      const { meta } = node;

      if (meta && meta.includes("filepath=")) {
        const match = meta.match(/filepath="(.+?)"/);
        const filePath = match && match[1];

        if (filePath) {
          const fullPath = path.join(process.cwd(), filePath);
          node.value = fs.readFileSync(fullPath, "utf8");
        }
      }
    });
  };
};

export default remarkCodeImport;
