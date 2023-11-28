import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  status: boolean;

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
