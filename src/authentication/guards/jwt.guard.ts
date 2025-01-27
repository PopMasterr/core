import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../metadata/public.meta';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    try {
      const canActivate = await super.canActivate(context);

      if (!canActivate) {
        throw new UnauthorizedException();
      }
      return true;
    } catch (error) {
      console.error("Error in canActivate:", error);
      throw new UnauthorizedException();
    }
  }

  handleRequest(err, user, info) {
    if (info && info.name === 'JsonWebTokenError') {
      console.error("JWT Error:", info.message);
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}