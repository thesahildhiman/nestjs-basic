import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  // @Prop({ enum: ['male', 'female'] })
  // gender: string;
}

export const userSchema = SchemaFactory.createForClass(User);
