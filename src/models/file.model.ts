import { Model, Optional, Sequelize, DataTypes, Association } from 'sequelize';
import { sequelize } from '.';
import { FileInstance, FileCreationAttributes } from '../interface';
import Product from './product.model';

class File extends Model<FileInstance, FileCreationAttributes> implements FileInstance {
  id!: number;
  originalName!: string;
  fileName!: string;
  totalRecords!: number;
  userId!: number;
  lastAccessTime!: Date;
  static associate(models: any) {
    File.hasMany(models.Product, {
      foreignKey: 'fileId',
    });
    Product.belongsTo(models.File, {
      foreignKey: 'fileId',
    });
  }
}

File.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalRecords: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: true,
    },
    lastAccessTime: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'File',
  },
);
File.associate({ Product, File });
export default File;
