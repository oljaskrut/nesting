import { HttpException, Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { AppService } from 'src/app.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(AppService) private readonly appService: AppService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(createUserDto.password, salt);
      const user = {
        ...(await this.userRepo.create(createUserDto)),
        passwordHash,
      };
      /* eslint-disable */
      const { password, ...data } = await this.userRepo.save(user);
      /* eslint-enable */
      await this.appService.status(data.id);
      return { data };
    } catch (e) {
      throw new HttpException('ERR_USER_EMAIL_EXISTS', 400);
    }
  }

  async findOne(id: number) {
    try {
      /* eslint-disable */
      const { password, ...user } = await this.userRepo.findOne({
        where: { id },
      });
      /* eslint-enable */
      return { message: 'SUCCESS', user };
    } catch (e) {
      throw new HttpException('ERR_USER_NOT_FOUND', 400);
    }
  }

  async findAll() {
    const data = await this.userRepo.find();
    return data.map(({ email, name }) => ({ email, name }));
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
