import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Ride from "./Ride";

// 총 몇번을 암호화 할 것인가. - 보통 10 ~ 12번을 하고 많이 할 경우 그만큼 스레드를 많이 잡아먹음
const BCRYPT_ROUNDS = 12;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() // column
  id: number; // columnName: type

  @Column({ type: "nvarchar", length: 50, nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "bool", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @ManyToOne(type => Chat, chat => chat.participants)
  chat: Chat;

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @OneToMany(type => Ride, ride => ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany(type => Ride, ride => ride.driver)
  ridesAsDriver: Ride[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  UpdatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * comparePassword
   * @public
   * @param {string} password - 사용자가 입력한 패스워드
   */
  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Insert하기 전에 실행
  @BeforeInsert()

  // Update하기 전에 실행
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
