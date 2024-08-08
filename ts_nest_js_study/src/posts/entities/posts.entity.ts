
// typeORM class

import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PostEmbedding } from './post_comment.entity';

// enum 칼럼!
export enum Role {
  HIGH = 'high',
  MIDDLE = 'middle',
  ROW = 'row',
}

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn() // auto_generate
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;

  @UpdateDateColumn()
  createdAt: Date;

  @Column(() => PostEmbedding)
  embedding: PostEmbedding;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.HIGH,
  })
  role: Role;
}