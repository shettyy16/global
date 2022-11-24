import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './mongooseSchema.interface';
import { KafkaProvider } from 'src/kafka/kafka.provider';

@Injectable()
export class MongooseSchema {
  constructor(
    @Inject('MOONGOOSE_MODEL')
    private catModel: Model<Cat>,
    private kafkaProducer: KafkaProvider,
  ) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.find({});
  }

  async mappingFields(NewData: any, dbData: any, topic: any): Promise<any> {
    // console.log('NewData : ', NewData);
    for (let newDbData of dbData) {
      if (NewData.type == newDbData.message_type) {
        let consumerData = NewData.data;
        let dbFields = newDbData.fields;
        let result = Object.keys(consumerData).filter(key => dbFields.includes(key))
        let final_value = result.map(key => [key, consumerData[key]])
        let NewData_type = NewData.type.replace("sync-", "save-");
        // console.log(final_value,NewData_type);
     
        if(topic=="legacy-event-input"){
          if(NewData.type=="sync-rider"){
            console.log('legacy-event-input : ', NewData.type ,NewData_type);
            await this.kafkaProducer.SendProducer(final_value, NewData_type);
          }
        }


      }
    }
  }
}
