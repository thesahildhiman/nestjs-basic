import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create_post.dto';
import { Post } from 'src/schemas/post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StatusUpdateDto } from './dto/status_update.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(id: string, createPostDto: CreatePostDto) {
    // console.log('>>>>>>>>>>>>>>>>>', id);
    const newPost = new this.postModel({ ...createPostDto, author: id });
    const savedPost = await newPost.save();
    return savedPost;
  }

  async updateStatus(statusDto: StatusUpdateDto) {
    const { id, status } = statusDto;
    // console.log('---id--<>>>>>', { id, status });
    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true },
    );
    return updatedPost;
  }
}
