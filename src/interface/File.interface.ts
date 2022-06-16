import { Optional } from 'sequelize';
export interface FileInstance {
  id: number;
  originalName: string;
  fileName: string;
  totalRecords: number;
  userId: number;
  lastAccessTime: Date;
}

export type FileCreationAttributes = Optional<FileInstance, 'id' | 'userId' | 'lastAccessTime'>;
