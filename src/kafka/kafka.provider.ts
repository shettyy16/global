import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { MongoService } from 'src/Mongo/mongo.service';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaProvider {
  constructor(
    private kafkaService: KafkaService, 
  ) {}
  kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT,
    brokers: process.env.KAFKA_BROKER_IP.split(','),
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_SASL_USERNAME,
      password: process.env.KAFKA_SASL_PASSWORD,
    },
    retry: {
      initialRetryTime: 100,
      retries: 10,
    },
    requestTimeout: 120000,
  });
  producer = this.kafka.producer();
  consumer = this.kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

  async SendProducer(data: any ,outputTopic): Promise<any> {
    const mainData = [{ value: JSON.stringify(data) }];
    await this.producer.connect();
    await this.producer.send({
      topic: outputTopic,
      messages: mainData,
    });
  }

  async GetConsumer(): Promise<any> {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topics: process.env.KAFKA_TOPICS.split(','),
      fromBeginning: false,
    });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const mainData = JSON.parse(message.value.toString());
        // console.log('BEFORE MAINDATA', mainData);
        // console.log('topic : ' , topic);
        await this.kafkaService.ConsumerToglobal(mainData,topic);
      },
    });
  }
}
