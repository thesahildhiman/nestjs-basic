import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update_user.dto';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice', role: 'intern', email: 'alice@example.com' },
    { id: 2, name: 'Bob', role: 'student', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', role: 'engineer', email: 'charlie@example.com' },
    { id: 4, name: 'David', role: 'intern', email: 'david@example.com' },
    { id: 5, name: 'Eva', role: 'student', email: 'eva@example.com' },
    { id: 6, name: 'Frank', role: 'engineer', email: 'frank@example.com' },
    { id: 7, name: 'Grace', role: 'intern', email: 'grace@example.com' },
  ];

  findAll(role: string) {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('enter valid role');
      return rolesArray;
    }
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  deleteUser(id: number) {
    console.log('---delete user by id--', id);
    const remUsers = this.users.filter((user) => user.id !== id);
    this.users = [...remUsers];
  }

  createUser(createUserDto: CreateUserDto) {
    const newIdx = this.users.length + 1;
    return this.users.push({ id: newIdx, ...createUserDto });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    console.log('--user dtsa---', id, updateUserDto);
    const user = this.users.find((user) => user.id === id);
    const updatedUser = { ...user, ...updateUserDto };
    console.log('......', updatedUser);
    return (this.users = [...this.users, updatedUser]);
  }
}
