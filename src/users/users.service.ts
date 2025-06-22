import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../common/utils/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * @param tenantId - The ID of the tenant to which the user belongs.
   * @param dto - The user data transfer object containing user details.
   * @returns The created us  er.
   */
  async create(tenantId: string, dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create({
      tenant_id: tenantId,
      email: dto.email,
      password_hash: await hashPassword(dto.password),
    });
    return this.userRepo.save(user);
  }

  /**
   * Finds all users in a specific tenant.
   * @param tenantId - The ID of the tenant.
   * @returns An array of users.
   */
  async findAll(tenantId: string): Promise<User[]> {
    return this.userRepo.find({ where: { tenant_id: tenantId } });
  }

  /**
   * Finds a user by email.
   * @param email - The email of the user.
   * @returns The user with the specified email.
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Finds a user by ID scoped to a specific tenant.
   * @param id - The ID of the user.
   * @param tenantId - The ID of the tenant.
   * @returns The user with the specified ID and tenant ID.
   */
  async findByIdScoped(id: string, tenantId: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id, tenant_id: tenantId } });
  }

  /**
   * Soft deletes a user by ID.
   * @param id - The ID of the user.
   * @returns The deleted user.
   */
  async softDelete(id: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.is_active = false;
    return this.userRepo.save(user);
  }
}
