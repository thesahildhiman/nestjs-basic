import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, postSchema } from 'src/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtVerifyService } from 'src/jwt-verify/jwt-verify.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: postSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, JwtService, JwtVerifyService],
})
export class PostModule {}
