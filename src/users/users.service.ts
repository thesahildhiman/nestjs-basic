import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice', role: 'intern' },
    { id: 2, name: 'Bob', role: 'student' },
    { id: 3, name: 'Charlie', role: 'engineer' },
    { id: 4, name: 'David', role: 'intern' },
    { id: 5, name: 'Eva', role: 'student' },
    { id: 6, name: 'Frank', role: 'engineer' },
    { id: 7, name: 'Grace', role: 'intern' },
  ];

  findAll(role: string) {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  deleteUser(id: number) {
    console.log('---delete user by id--', id);
    const remUsers = this.users.filter((user) => user.id !== id);
    this.users = [...remUsers];
  }

  createUser(userData: { name: string; role: string }) {
    const newIdx = this.users.length + 1;
    return this.users.push({ id: newIdx, ...userData });
  }

  updateUser(id: number, userData: { name: string; role: string }) {
    console.log('--user dtsa---', id, userData);
    const user = this.users.find((user) => user.id === id);
    const updatedUser = { ...user, ...userData };
    console.log('......', updatedUser);
    return (this.users = [...this.users, updatedUser]);
  }
}
