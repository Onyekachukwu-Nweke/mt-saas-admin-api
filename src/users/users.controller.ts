import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @Permissions('read:user')
  async getAll(@Req() req) {
    const tenantId = req.user.tenant_id;
    if (tenantId === null) {
      throw new NotFoundException('Tenant not found');
    }
    return this.usersService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @Permissions('read:user')
  async getOne(@Req() req, @Param('id') id: string) {
    const user = await this.usersService.findByIdScoped(id, req.user.tenant_id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @Permissions('delete:user')
  async delete(@Req() req, @Param('id') id: string) {
    const user = await this.usersService.findByIdScoped(id, req.user.tenant_id);
    if (!user) throw new NotFoundException('User not found');
    return this.usersService.softDelete(id);
  }
}
