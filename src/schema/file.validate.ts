import { Joi, Segments } from 'celebrate';

const FileIDSchema = {
  params: {
    id: Joi.number().required(),
  },
};

export default {
  FileIDSchema,
};
