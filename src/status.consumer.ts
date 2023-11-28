import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';

@Processor('status')
export class StatusConsumer {
  private readonly logger = new Logger(StatusConsumer.name);

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  @Process()
  async status(job: Job<{ userId: number }>) {
    this.logger.log(`Received status update: ${job.id} ${job.data.userId}`);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
    await this.userRepo.update({ id: job.data.userId }, { status: true });
    this.logger.log(`Status update complete for: ${job.id}`);
  }
}
