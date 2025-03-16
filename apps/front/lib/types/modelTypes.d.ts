export type Post = {
  id: string;
  title: string;
  slug: string;
  author: User;
  content: string;
  thumbnail: string | null;
  published: boolean;
  authorId: number;
  tags?: Tag[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    likes: number;
    comments: number;
  };
};

export type User = {
  name: string;
  id: string;
  email: string;
  bio: string | null;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: string;
  name: string;
};

export type CommentEntity = {
  id: string;
  content: string;
  post: Post;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};
