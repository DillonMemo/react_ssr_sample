import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne
} from "typeorm";
import { verificationTaret } from "src/types/types";
import User from "./User";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", enum: [PHONE, EMAIL] })
  target: verificationTaret;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  used: boolean;

  @ManyToOne(type => User, user => user.verifications)
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  UpdatedAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      /// .floor - 내림차순
      this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === EMAIL) {
      /// .tostring(36) - 숫자가 들어와도 text로 반환
      /// ex) Math.random().toString(36) = "0.qthnohhe1cs"
      this.key = Math.random()
        .toString(36)
        .substr(2);
    }
  }
}

export default Verification;
