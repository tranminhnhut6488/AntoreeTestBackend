import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { TeachersModule } from './teachers/teacher.module';
import { BookingsModule } from './bookings/booking.module';
import { User } from './users/user.entity';
import { Teacher } from './teachers/teacher.entity';
import { Booking } from './bookings/booking.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PackageModule } from './package/package.module';
import { Package } from './package/package.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const type = process.env.DB_TYPE || 'sqlite';
        if (type === 'mysql') {
          return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 3306),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            url: process.env.DATABASE_URL,
            entities: [User, Teacher, Booking, Package],
            autoLoadEntities: true,
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
          } as any;
        }
        return {
          type: 'sqlite',
          database: process.env.DB_PATH || 'antoree',
          entities: [User, Teacher, Booking, Package],
          synchronize: true,
        } as any;
      },
    }),

    TypeOrmModule.forFeature([User, Teacher, Booking, Package]),
    AuthModule,
    UsersModule,
    TeachersModule,
    BookingsModule,
    PackageModule
  ],
})
export class AppModule { }

