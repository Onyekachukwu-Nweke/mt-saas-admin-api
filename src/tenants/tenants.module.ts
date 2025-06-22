import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { Tenant } from './entities/tenant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, UsersService],
  imports: [TypeOrmModule.forFeature([Tenant, User])],
})
export class TenantsModule {}
