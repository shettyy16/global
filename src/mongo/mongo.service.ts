import { Injectable } from '@nestjs/common';
import { dbObj } from './mongo.provider';

@Injectable()
export class MongoService {
  // async StoreInMongo(collectionName: string, data: object): Promise<any> {
  //   try {
  //     const count = await dbObj['db']
  //       ['collection'](collectionName)
  //       .countDocuments({});
  //     data['count'] = count;
  //     return await dbObj['db']['collection'](collectionName).insertOne(data);
  //   } catch (ex) {
  //     return {
  //       error: true,
  //       message: 'Error while Inserting in Mongo',
  //       errorMessage: ex,
  //     };
  //   }
  // }
  async getData(collectionName: string): Promise<any> {
    // console.log(Collection);
    console.log(dbObj);
    console.log(collectionName);
    // const data = await dbObj['db']
    //   ['collection'](collectionName)
    //   .find({})
    //   .toArray();
    // return data;
  }
}
