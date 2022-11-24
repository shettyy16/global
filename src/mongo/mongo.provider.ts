import { MongoClient } from 'mongodb';

export const dbObj = {};

export async function connectToMongoDatabase(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    console.log(process.env.MONGO_DATABASE_URI);
    try {
      const client: MongoClient = new MongoClient(
        process.env.MONGO_DATABASE_URI,
        {
          keepAlive: true,
          useUnifiedTopology: true,
        },
      );
      await client.connect();
      // console.log(process.env.MONGO_DB_NAME);

      dbObj['db'] = await client.db('Nestmongo');
      console.log(dbObj);

      resolve(dbObj);
    } catch (ex) {
      reject(ex);
    }
  });
}
