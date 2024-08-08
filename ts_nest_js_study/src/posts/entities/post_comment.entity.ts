import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// 다른 모델과 중복되는 부분은 embedding을 한다
// Entitiy로 선언하지 말것

export class PostEmbedding {
  @Column()
  author: string;

  @UpdateDateColumn()
  createdAt: Date;
}


@Entity()
export class PostCommentModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 임베드한 모델을 함수로 받아서 생성한다
  @Column(() => PostEmbedding)
  embedding: PostEmbedding;
}