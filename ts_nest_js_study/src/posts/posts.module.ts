import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './entities/posts.entity';
import { PostCommentModel } from './entities/post_comment.entity';

@Module({
  // 클래스를 그대로 넣었음. 클래스를 인스턴스화하고 싶은 게 아니고, IoC 컨테이너가 자동으로 인스턴스화하고 관리하기 위해
  // forFeature: 모델에 해당되는 레포지토리를 주입할 때
  imports: [TypeOrmModule.forFeature([
    PostModel,
    PostCommentModel,
  ])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
