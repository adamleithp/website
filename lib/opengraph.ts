import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const OpenGraphSize = {
  width: 1200,
  height: 630,
};
export const regularFont = fs.promises.readFile(
  path.join(
    fileURLToPath(import.meta.url),
    `../../public/Inter_28pt-Regular.ttf`
  )
);

export const boldFont = fs.promises.readFile(
  path.join(fileURLToPath(import.meta.url), `../../public/Inter_28pt-Bold.ttf`)
);
