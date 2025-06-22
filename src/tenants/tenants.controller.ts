import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TenantsService } from './tenants.service';
// import { CreateTenantDto } from './dto/create-tenant.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateTenantWithUserDto } from './dto/create-tenant-with-user.dto';
// import { Tenant } from './entities/tenant.entity';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tenants' })
  // @ApiResponse({ status: 200, type: [Tenant] })
  async getAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tenant by id' })
  // @ApiResponse({ status: 200, type: Tenant })
  @ApiParam({ name: 'id', description: 'Tenant ID', required: true })
  async getOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a tenant' })
  // @ApiResponse({ status: 201, type: Tenant })
  @ApiBody({ type: CreateTenantWithUserDto })
  async create(@Body() createTenantWithUserDto: CreateTenantWithUserDto) {
    return this.tenantsService.createWithUser(createTenantWithUserDto);
  }
}
