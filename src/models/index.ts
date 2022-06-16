'use strict';
import * as path from 'path';
import * as fs from 'fs';
import { Sequelize, DataTypes } from 'sequelize';
import environmentConfig from '../constants/environment.constant';
const env = environmentConfig.NODE_ENV;

const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config);

export { Sequelize, sequelize };
