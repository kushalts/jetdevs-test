import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import File from '../models/file.model';
import Product from '../models/product.model';
import * as path from 'path';
import xlsx from 'node-xlsx';
import { MyUserRequest } from '../interface';
import environmentConfig from '../constants/environment.constant';
export class FileController {
  public async fileUpload(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(404).json({ message: 'Please upload excel file...!' });
      }
      const workSheetsFromFile = xlsx.parse(path.join(`${__dirname}../../../`, file!.path));
      if (file) {
        const originalName: string = file?.originalname.substr(0, file?.originalname.lastIndexOf('.'));
        const records: any = [];
        workSheetsFromFile.forEach((item) => {
          item.data.forEach((product: any, index: any) => {
            if (index) {
              records.push({
                name: product[0],
                price: product[1],
              });
            }
          });
        });
        const fileData = {
          originalName,
          fileName: file?.filename,
          totalRecords: records.length,
        };
        const savedFile = await File.create({
          fileName: fileData.fileName,
          originalName,
          totalRecords: fileData.totalRecords,
        });
        records.forEach((data: any) => {
          Object.assign(data, {
            fileId: savedFile.getDataValue('id'),
          });
        });

        let start = 0,
          end = parseInt(environmentConfig.DATA_BATCH_SIZE);
        const inserBatch = setInterval(() => {
          if (end > records.length) {
            clearInterval(inserBatch);
          }
          Product.bulkCreate(records.slice(start, end));
          start = end;
          end = end + parseInt(environmentConfig.DATA_BATCH_SIZE);
        }, parseInt(environmentConfig.INSERT_INTERVAL));
      }
      return res.status(200).json({ message: 'File uploaded successfully..!' });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  public async listFiles(req: Request, res: Response) {
    try {
      const files = await File.findAndCountAll();
      return res.json(files);
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  public async reviewFile(req: MyUserRequest, res: Response) {
    try {
      const file = await File.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['userId'] },
        include: [
          {
            model: Product,
            attributes: ['name', 'price'],
          },
          {
            model: User,
            attributes: ['id', 'email'],
          },
        ],
      });
      if (!file) {
        return res.status(404).json({ message: "Sorry your requested file doesn't exist" });
      }

      await File.update({ lastAccessTime: new Date(), userId: req.user.id }, { where: { id: req.params.id } });

      return res.status(200).json(file);
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  public async deleteFile(req: MyUserRequest, res: Response) {
    try {
      const file = await File.findOne({
        where: { id: req.params.id },
      });
      if (!file) {
        return res.status(404).json({ message: "Sorry your requested file doesn't exist" });
      }

      await Product.destroy({ where: { fileId: req.params.id } });
      await File.destroy({ where: { id: req.params.id } });
      return res.status(200).json('Your File has been deleted successfully...!');
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }

  public async progress(req: MyUserRequest, res: Response) {
    try {
      const file = await File.findOne({
        where: { id: req.params.id },
      });
      if (!file) {
        return res.status(404).json({ message: "Sorry your requested file doesn't exist" });
      }
      const products = await Product.count({ where: { fileId: file.getDataValue('id') } });

      const percentage: number = (products / file.getDataValue('totalRecords')) * 100;
      return res.status(200).json({ progress: `${percentage.toFixed(2)} %` });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
