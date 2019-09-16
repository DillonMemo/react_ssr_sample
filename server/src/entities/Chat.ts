import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import Message from "./Message";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  UpdatedAt: string;
}

export default Chat;
