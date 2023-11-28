import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('userController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = user.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const res = await userController.create({
        email: 'test@gmail.com',
        name: 'test',
        password: 'test',
      });
      console.log(res);
      expect(res.data.email).toBe('test@gmail.com');
      userController.remove(res.data.id.toString());
    });
  });
});
