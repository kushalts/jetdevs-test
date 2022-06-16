import { DataTypes, Model } from 'sequelize';

import { ProductInstance } from '../interface';
import { sequelize } from '.';
import File from './file.model';

class Product extends Model<ProductInstance> implements ProductInstance {
  id!: number;
  fileId!: number;
  name!: string;
  price!: number;
}

Product.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    fileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'file',
        key: 'id',
      },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
  },
);
export default Product;
