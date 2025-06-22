import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!required) return true;

    const { user } = context.switchToHttp().getRequest();
    const userPerms = user?.permissions || [];

    const hasAll = required.every((p) => userPerms.includes(p));
    if (!hasAll) throw new ForbiddenException('Insufficient permissions');
    return true;
  }
}
