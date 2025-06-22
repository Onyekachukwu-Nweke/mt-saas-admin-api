import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  // src/roles/roles.service.ts
  async seedDefaultRoles(tenantId: string) {
    const adminRole = this.roleRepo.create({
      tenant_id: tenantId,
      name: 'admin',
      permissions: ['read:user', 'delete:user', 'create:user', 'read:role'],
    });

    const viewerRole = this.roleRepo.create({
      tenant_id: tenantId,
      name: 'viewer',
      permissions: ['read:user'],
    });

    await this.roleRepo.save([adminRole, viewerRole]);
    return { adminRole, viewerRole };
  }
}
