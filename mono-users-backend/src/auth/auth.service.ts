import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { username, id, createdAt, updatedAt } = user.dataValues;
    const payload = { username, id, createdAt, updatedAt };
    return {
      access_token: this.jwtService.sign(payload),
      username,
      id,
    };
  }

  async register(username: string, password: string) {
    return this.usersService.createUser(username, password);
  }
}
