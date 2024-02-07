import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create_post.dto';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth-guard/auth.guard';
import { Request, Response } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/role-guard/role.guard';
import { StatusUpdateDto } from './dto/status_update.dto';
import { DataValidationInterceptor } from 'src/data-validation/data-validation.interceptor';

interface extendedRequest extends Request {
  user?: any;
}

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @Res() res: Response,
    @Req() req: extendedRequest,
  ) {
    // console.log('---req---', typeof req.user.id);
    try {
      const newPost = await this.postService.createPost(
        req.user.id,
        createPostDto,
      );
      res
        .status(HttpStatus.CREATED)
        .json({ message: 'post created successfully', newPost });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //   only admin can update post status
  @Post('update-status')
  // @UseGuards(AuthGuard)
  @Roles('admin') //decorator
  @UseGuards(RoleGuard)
  async updatePostStatus(
    @Body(ValidationPipe)
    statusDto: StatusUpdateDto,
    @Req() req: extendedRequest,
    @Res() res: Response,
  ) {
    try {
      const role = req.user.roles;
      if (role === 'admin') {
        const updatedPost = await this.postService.updateStatus(statusDto);
        return res
          .status(HttpStatus.OK)
          .json({ message: 'status updated', updatedPost });
      }
      throw new HttpException(
        'unauthorized to update post',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // testing of data-validation.intersector
  @Post('test')
  @UseInterceptors(DataValidationInterceptor)
  test(@Body() name: string) {
    console.log('---name---', name);
    return this.postService.test(name)
    // console.log('----after controller---')
    // return
  }
}
