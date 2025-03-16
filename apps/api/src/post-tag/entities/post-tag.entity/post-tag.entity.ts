import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@ObjectType()
export class PostTag {
  @Field(() => ID)
  id: string;

  @Field(() => Post)
  post: Post;

  @Field(() => Tag)
  tag: Tag;
}
