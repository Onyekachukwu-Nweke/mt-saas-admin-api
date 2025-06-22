import { Module } from '@nestjs/common';
import config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...config.db,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    TenantsModule,
  ],
})
export class AppModule {}
