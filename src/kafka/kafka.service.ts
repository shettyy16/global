import { Injectable } from '@nestjs/common';
import { MongoService } from 'src/Mongo/mongo.service';
import { MongooseSchema } from 'src/schema/mongooseSchema.service';

@Injectable()
export class KafkaService {
  constructor(
    private mongoService: MongoService,
    private mongooseSchema: MongooseSchema,
  ) {}
  async ConsumerToglobal(NewData: any ,topic:any): Promise<any> {
    // const data = await this.mongoService.getData('test');
    const dbData = await this.mongooseSchema.findAll();
    // console.log('Collection :' + process.env.MONGO_LOG_COLLECTION);
    console.log('NewData :' , NewData , topic);
    await this.mongooseSchema.mappingFields(NewData , dbData, topic);
    
  }

}
