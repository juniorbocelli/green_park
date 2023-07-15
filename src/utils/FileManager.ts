import crypto from 'crypto';
import * as path from 'path';
import fs from 'fs';

import {
  DeleteFileException,
  CountPdfFilesException,
} from '../exceptions/FileManagerExceptions';

export interface FileWriteResult {
  fileName: string;
  filePathInServer: string;
  filePathOutServer: string;
};

class FileManager {
  static localStorage = process.env.DEFAULT_PDF_STORAGE_FOLDER;
  static savePdfPath = path.resolve(__dirname, '..', `${process.env.DEFAULT_PDF_STORAGE_FOLDER}`);

  public static async fileExistWithPath(path: string) {
    return fs.promises.access(path, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
  };

  public static async deleteFileWithPath(path: string) {
    if (!(await this.fileExistWithPath(path)))
      return;

    fs.unlink(path, (error) => {
      if (error) {
        throw new DeleteFileException(error.message);
      };
    });
  };

  public static async fileExistWithFilename(filename: string) {
    return fs.promises.access(filename, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
  };

  public static async deleteFileWithFilename(filename: string) {
    if (!(await this.fileExistWithFilename(filename)))
      return;

    fs.unlink(filename, (error) => {
      if (error) {
        throw new DeleteFileException(error.message);
      };
    });
  };

  public static async deletePdfWithFilename(filename: string) {
    const _filename = filename.split("/").at(-1) || filename;
    const filePath = `${this.savePdfPath}/${_filename}`;

    if (await this.fileExistWithPath(filePath))
      this.deleteFileWithPath(filePath);
  };

  private static async writeFileFromBuffer(buffer: Buffer, filePath: string): Promise<FileWriteResult> {
    const controller = new AbortController();
    const { signal } = controller;
    const fileName = filePath.split("/").at(-1) || filePath;

    try {
      const saving = fs.promises.writeFile(filePath, buffer, { signal });
      await saving;

    } catch (error) {
      // Abort the request before the promise settles.
      controller.abort();
      throw new Error(error as string);

    };

    const out: FileWriteResult = {
      fileName: fileName,
      filePathInServer: filePath,
      filePathOutServer: `${this.localStorage}/${fileName}`,
    };

    return out;
  };

  public static async writePdfFromBuffer(buffer: Buffer, filename?: string): Promise<FileWriteResult> {
    const fileName = `${typeof filename === "undefined" ? crypto.randomBytes(8).toString('hex') : filename}.pdf`;
    const filePath = `${this.savePdfPath}/${fileName}`;

    return this.writeFileFromBuffer(buffer, filePath);
  };

  public static async getPdfFromFilename(filename: string): Promise<Buffer | undefined> {
    const controller = new AbortController();
    const { signal } = controller;

    const _filename = filename.split("/").at(-1) || filename;

    try {
      const file = fs.promises.readFile(`${this.savePdfPath}/${_filename}`, { signal });

      return await file;
    } catch (error: any) {
      // Abort the request before the promise settles.
      controller.abort();
      throw new Error(error as string);
    };
  };

  public static countPdfFilesInFolder() {
    try {
      const value = fs.readdirSync(this.savePdfPath).length;

      return value;
    } catch (error: any) {
      throw new CountPdfFilesException(error.message);
    };
  };
};

export default FileManager;