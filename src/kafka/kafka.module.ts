import { Module } from '@nestjs/common';
import { MongoService } from 'src/Mongo/mongo.service';
import { KafkaProvider } from './kafka.provider';
import { KafkaService } from './kafka.service';
import { MongooseSchema } from 'src/schema/mongooseSchema.service';
import { mongooseProviders } from '../schema/mongooseSchema.providers';
import { mongooseModule } from 'src/schema/mongooseSchema.module';
import { DatabaseModule } from 'src/mongoose/database.module';

@Module({
  imports: [mongooseModule, DatabaseModule],
  controllers: [],
  providers: [
    KafkaProvider,
    KafkaService,
    MongoService,
    MongooseSchema,
    ...mongooseProviders,
  ],
  exports:[KafkaProvider]
})
export class KafkaModule {
  constructor(
    private kafka: KafkaProvider,
    private kafkaService: KafkaService,
  ) {}
  run = this.kafka.GetConsumer();
}
