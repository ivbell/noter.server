import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt.guards";
import { LocalAuthGuard } from "./guards/local.guards";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  refresh(@Request() req) {
    return this.authService.refresh(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  auth(@Request() req) {
    const role = this.authService.loginTokenUser(req.user.id);
    return role;
  }
}
