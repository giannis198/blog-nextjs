import { ObjectType, Field, ID } from '@nestjs/graphql';

import { IsString } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Like {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field()
  @IsString()
  userId: string;

  @Field(() => Post)
  post: Post;

  @Field()
  @IsString()
  postId: string;

  @Field()
  createAt: Date;
}
