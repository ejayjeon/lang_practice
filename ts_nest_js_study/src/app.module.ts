import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './posts/entities/posts.entity';
import { PostCommentModel } from './posts/entities/post_comment.entity';
import { BookModel, EpisodeModel } from './posts/entities/post_inheritance.entity';

@Module({
  imports: [PostsModule, TypeOrmModule.forRoot({
    type: 'postgres', // db type
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [PostModel, PostCommentModel, BookModel, EpisodeModel], // db와 연동될 모델들
    synchronize: false, // nestjs에서 작성하는 typeORM 코드와 디비 싱크를 맞출 거냐? dev 에서는 true, production에서는 함부로 바꾸지 않기 위해 false로 
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
