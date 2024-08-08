import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entities/posts.entity';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

// export interface PostModel {
//   id: number;
//   author: string;
//   title: string;
//   content: string;
//   likeCount: number;
//   commentCount: number;
// }

// // 임시로 데이터를 저장할 변수 ㅖㅐ
// let posts: PostModel[] = [
//   {
//     id: 1,
//     author: '뉴진스',
//     title: 'Hello New Jeans',
//     content: '안녕하세요',
//     likeCount: 10,
//     commentCount: 5,
//   },
//   {
//     id: 2,
//     author: '뉴진스2',
//     title: 'Hello New Jeans',
//     content: '안녕하세요',
//     likeCount: 50,
//     commentCount: 100,
//   },
// ];
@Injectable() // 프로바이더로 사용한다고 선언
export class PostsService {
  // repository 주입
  constructor(
    // 모델에 해당하는 레포지토리를 서비스에 주입하고 싶을 때 해당 패턴을 이용.
    @InjectRepository(PostModel)
    private readonly postsRepository: Repository<PostModel>,) { }

  // 1. GET /posts (모든 포스트 가져옴)
  async getAllPosts() {
    return await this.postsRepository.find();
  }

  // 2. GET /posts/:id 
  async getPostById(id: number) {
    // const post = posts.find((post) => post['id'] === +id); // + 숫자로 변경
    const post = await this.postsRepository.findOne({
      // Repository에서 바라보는 PostModel의 id가 입력한 id과 같을 때
      where: { id: id, },
    });

    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  // 3. POST /create Post
  async createPost(body: PostModel) {
    // const post: PostModel = {
    //   id: posts[posts.length - 1].id + 1,
    //   author: body.author,
    //   title: body.title,
    //   content: body.content,
    //   likeCount: +body.likeCount,
    //   commentCount: +body.commentCount,
    // };
    // posts = [
    //   ...posts,
    //   post,
    // ];

    // return post;


    // 1) create: 저장할 객체를 생성한다
    const post = this.postsRepository.create({
      author: body.author,
      title: body.title,
      content: body.content,
      // likeCount: +body.likeCount,
      likeCount: 0, // 새로 생성된 객체는 0
      // commentCount: +body.commentCount,
      commentCount: 0,
    });
    // 2) save: 객체를 저장한다 (create 메서드에서 생성한 객체로)
    const newPost = await this.postsRepository.save(post);
    return newPost;
  }

  // 4. PUT /posts/:id
  async updatePostById(id: number, body?: PostModel) {
    // save의 기능
    // 만약에 데이터가 존재하지 않는다면 새로 생성한다
    // 만약에 데이터가 존재한다면 존재하던 값을 업데이트한다
    // const post = posts.find((post) => post['id'] === +id);
    const post = await this.postsRepository.findOne({
      where: { id: id },
    });

    if (!post) {
      throw new NotFoundException();
    }
    // body에 입력한 값들만 바꿈
    const keys = Object.keys(body); // [id, author, title, content...]

    for (const key of keys) { // in 하면 0, 1... of 하면 실제 값
      if (body[key]) {
        post[key] = body[key];
      }
    }
    return await this.postsRepository.save(post);
  }

  // 5. DELETE /posts/:id
  async deletePostById(id: number) {
    // const post = posts.find((post) => post['id'] === +id);
    const post = await this.postsRepository.findOne({
      where: { id }
    });

    if (!post) {
      throw new NotFoundException();
    }
    // filter를 사용
    // posts = posts.filter((post) => post['id'] !== +id); // 입력된 아이디와 다른 것들만 다시 저장

    return await this.postsRepository.delete(id);
  }
}
