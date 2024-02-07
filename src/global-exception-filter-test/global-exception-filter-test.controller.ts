import { BadRequestException, Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilterTestService } from './global-exception-filter-test.service';
import { PostDto } from './dto/post.dto';

@Controller('global-exception-filter-test')
export class GlobalExceptionFilterTestController {
  constructor(
    private readonly globalExceptionFilterTestService: GlobalExceptionFilterTestService,
  ) {}

  @Post('post')
  async postGlobal(@Body(ValidationPipe) postDto: PostDto) {
    if(postDto.name.trim() === ''){
        throw new BadRequestException()
    }
    this.globalExceptionFilterTestService.postGlobal(postDto);
  }
}
