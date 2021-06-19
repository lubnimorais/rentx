import fs from 'fs';

export const deleteFile = async (filename: string) => {
  // stat -> verifica se um arquivo existe ou não no diretório
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
};
