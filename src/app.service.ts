import { HttpException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(@InjectQueue('status') private readonly statusQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async status(userId: number) {
    return await this.statusQueue.add({ userId });
  }

  async proxify(url: string) {
    try {
      const { data } = await axios(url, {
        proxy: {
          host: '45.196.48.9',
          port: 5435,
          auth: {
            username: 'jtzhwqur',
            password: 'jnf0t0n2tecg',
          },
        },
      });
      return data;
    } catch (e) {
      throw new HttpException('ERR_PERFORMING_AXIOS_REQUEST', 500);
    }
  }
}
