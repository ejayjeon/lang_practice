/** Pick */

interface Post {
  title: string;
  content: string;
  createdAt: Date;
}

// 포스트를 생성할 때, 생성 날짜는 자동으로 생성하는 경우가 많다.
function createPost(post: Pick<Post, 'title' | 'content'>): Post {
  return {
    ...post,
    createdAt: new Date(),
  };
}

console.log(createPost({
  title: '안녕하세요',
  content: '반가워요',
}));