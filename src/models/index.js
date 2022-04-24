// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Calculation } = initSchema(schema);

export {
  Calculation
};