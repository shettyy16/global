import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { connectToMongoDatabase } from './mongo/mongo.provider';
import { MongoModule } from './Mongo/mongo.module';
import { KafkaModule } from './kafka/kafka.module';
import { mongooseModule } from './schema/mongooseSchema.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.local.env',
      isGlobal: true,
    }),
    // MongoModule,
    KafkaModule,
    mongooseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    connectToMongoDatabase()
      .then(() => {
        console.log('MongoDB Connected');
      })
      .catch((ex) => {
        console.log('Error While Connecting MongoDB\n', ex);
      });
  }
}
