import { readCode } from "@/lib/posts";
import React from "react";

const FileCodeBlock = ({
  filePath,
  language,
}: {
  filePath: string;
  language: string;
}) => {
  const code = readCode(filePath);

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default FileCodeBlock;
