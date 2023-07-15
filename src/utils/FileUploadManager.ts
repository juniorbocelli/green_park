import { Request, Response } from "express";
import multer, { Multer } from "multer";
import * as path from "path";

import { ProhibitedFileExtensionException } from '../exceptions/FileUploadManagerExceptions';

export type UploadedFile = {
  fieldname: string; // file
  originalname: string; // myPicture.png
  encoding: string; // 7bit
  mimetype: string; // image/png
  buffer: Buffer;
  destination: string; // ./public/uploads
  filename: string; // 1571575008566-myPicture.png
  path: string; // public/uploads/1571575008566-myPicture.png
  size: number; // 1255
};

class FileUploadManager {
  private uploadFile: Multer;

  constructor(permitedExtensions: string[], permitedMimeTypes: string[]) {
    this.uploadFile = multer({
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter(req, file, callback) {
        const extension: boolean = permitedExtensions.indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
        const mimeType: boolean = permitedMimeTypes.indexOf(file.mimetype) >= 0;

        if (extension && mimeType) {
          return callback(null, true);
        }
        callback(new ProhibitedFileExtensionException(permitedExtensions, permitedMimeTypes));
      },
    });
  };

  public handleArrayUploadFile = async (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject): void => {
      let uploader = this.uploadFile.array('files', undefined);
      uploader(req, res, (error: any) => {
        if (error) {
          reject(error);
        };

        resolve({ files: req.files, body: req.body });
      });
    });
  };

  public handleGetBody = async (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject): void => {
      let uploader = this.uploadFile.none();
      uploader(req, res, (error: any) => {
        if (error) {
          reject(error);
        };

        resolve({ files: req.files, body: req.body });
      });
    });
  };
};

export default FileUploadManager;