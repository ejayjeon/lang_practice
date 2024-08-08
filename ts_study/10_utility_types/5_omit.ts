/** Omit */

interface Post {
  title: string;
  content: string;
  createdAt: Date;
}

// 포스트를 생성할 때, 생성 날짜는 자동으로 생성하는 경우가 많다.
// 무시하고싶은 프로퍼티를 Omit 안에 입력해준다
function createPost(post: Omit<Post, 'createdAt'>): Post {
  return {
    ...post,
    createdAt: new Date(),
  };
}