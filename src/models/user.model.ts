import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { UserInstance, UserCreationAttributes } from '../interface';
import File from './file.model';

class User extends Model<UserInstance, UserCreationAttributes> implements UserInstance {
  id!: number;
  email!: string;
  password!: string;
  role!: string;
  static associate(models: any) {
    User.hasMany(models.File, {
      foreignKey: 'userId',
    });
    File.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  }
}
User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

User.associate({ User, File });
export default User;
