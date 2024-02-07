import { BadGatewayException, Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';

@Injectable()
export class GlobalExceptionFilterTestService {
  async postGlobal(name: PostDto) {
    console.log('---name inside service--', name);
  }
}
