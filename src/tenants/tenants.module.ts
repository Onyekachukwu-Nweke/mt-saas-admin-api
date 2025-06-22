import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { Tenant } from './entities/tenant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
  imports: [TypeOrmModule.forFeature([Tenant])],
})
export class TenantsModule {}
