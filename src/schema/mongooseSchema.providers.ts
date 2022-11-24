import { Connection } from 'mongoose';
import { CatSchema } from './mongooseSchema.schema';

export const mongooseProviders = [
  {
    provide: 'MOONGOOSE_MODEL',
    useFactory: (connection: Connection) => connection.model('test', CatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
