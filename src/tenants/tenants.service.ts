import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { CreateTenantWithUserDto } from './dto/create-tenant-with-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Finds all tenants.
   * @returns An array of tenants.
   */
  async findAll(): Promise<Tenant[]> {
    return this.tenantRepo.find();
  }

  /**
   * Finds a tenant by ID.
   * @param id - The ID of the tenant.
   * @returns The tenant with the specified ID.
   */
  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepo.findOneBy({ id });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  /**
   * Creates a new tenant.
   * @param dto - The tenant data transfer object containing tenant details.
   * @returns The created tenant.
   */
  async create(dto: CreateTenantDto): Promise<Tenant> {
    const tenant = this.tenantRepo.create(dto);
    return this.tenantRepo.save(tenant);
  }

  /**
   * Creates a new tenant and a new user.
   * @param createTenantWithUserDto - The tenant data transfer object containing tenant details.
   * @returns The created tenant and user.
   */
  async createWithUser(createTenantWithUserDto: CreateTenantWithUserDto) {
    const tenant = this.tenantRepo.create({
      name: createTenantWithUserDto.name,
    });
    const savedTenant = await this.tenantRepo.save(tenant);
    const user = await this.usersService.create(
      savedTenant.id,
      createTenantWithUserDto.user,
    );
    return { tenant: savedTenant, user };
  }
}
