import { ObjectType, Field, ID } from '@nestjs/graphql';

import { IsString } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  name: string;

  @Field(() => [Post], { nullable: true }) // ✅ Allow null to prevent errors
  posts?: Post[];
}
