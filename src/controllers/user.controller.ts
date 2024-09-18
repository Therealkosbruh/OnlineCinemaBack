import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/database.entity';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userData: { name: string; surname: string; login: string; password: string; email: string }): Promise<User> {
    return this.userService.registerUser(userData.name, userData.surname, userData.login, userData.password, userData.email);
  }

@Post('login')
async loginUser(@Body() loginData: { loginOrEmail: string; password: string }, @Req() req: Request, @Res() res: any) {
  const user = await this.userService.loginUser(loginData.loginOrEmail, loginData.password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, login: user.login }, process.env.SECRET_KEY, { expiresIn: '1h' });

  res.set('Authorization', `Bearer ${token}`);

  return res.json({ user, token });
}
}