import path from 'path';
import fs from 'fs-extra';

export const writeFile = (dir, name, content) => {
  const filePath = path.join(dir, name);
  fs.ensureDirSync(path.dirname(filePath));
  return fs.writeFile(filePath, content);
};
