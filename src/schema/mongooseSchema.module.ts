import { Module } from '@nestjs/common';
import { MongooseSchema } from './mongooseSchema.service';
import { mongooseProviders } from './mongooseSchema.providers';
import { DatabaseModule } from '../mongoose/database.module';


@Module({
  imports: [DatabaseModule],
  providers: [MongooseSchema, ...mongooseProviders],
})
export class mongooseModule {}
