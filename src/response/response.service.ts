import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService {
  static handleSuccess(res: Response, data: any, message: string) {
    res.status(200).json({ data, message });
  }
}
