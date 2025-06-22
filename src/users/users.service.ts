import { Injectable } from '@nestjs/common';
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
      throw new Error('User not found');
    }
    return user;
  }
}
