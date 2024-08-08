import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostModel } from './entities/posts.entity';




@Controller('posts')
export class PostsController {
  // 서비스 프로바이더
  constructor(private readonly postsService: PostsService) { }


  // API 설계
  // 1) GET /posts (모든 포스트를 가져온다)
  @Get()
  getPosts() {
    // return posts;
    return this.postsService.getAllPosts();
  }
  // 2) GET /posts/:id (id에 해당하는 포스트를 가져온다)
  @Get(':id')
  // 패스 파라미터에서 id라는 파라미터를 가지고 옴 > 가지고 온 것은 id라는 변수에 저장해서 사용
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }
  // 3) POST /posts (posts를 생성한다)
  @Post()
  postPost(@Body() body: PostModel) {
    return this.postsService.createPost(body);
  }
  // 4) PUT /posts/:id (id에 해당하는 posts를 변경한다)
  @Put(':id')
  putPost(@Param('id') id: string, @Body() body?: PostModel) {
    return this.postsService.updatePostById(+id, body);
  }
  // 5) DELETE /posts/:id(id에 해당하는 post를 삭제한다)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePostById(+id);
  }
}
