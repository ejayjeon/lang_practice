import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from 'typeorm';

// 어떤 테이블이나 기본으로 깔고가는 값
export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}



// 1) 개별 테이블 Inheritance : 일반적인 상속, 많이 쓰임
@Entity()
export class BookModel extends BaseModel {
  @Column()
  bookName: string;
}

@Entity()
export class EpisodeModel extends BaseModel {
  @Column()
  episodeName: string;
}


// 2) Single Table Inheritance
// 싱글 테이블은 베이스가 되는 모델도 엔티티로 등록을 해준다
// 하나의 테이블로 관리해야하 일이 생길 때 씀
@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  }
})
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// @Entity()
@ChildEntity()
export class BrandModel extends SingleBaseModel {
  @Column()
  brand: string;
}

@ChildEntity()
export class PCModel extends SingleBaseModel {
  @Column()
  pc: string;
}