import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProjectModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'postgres',
      database: 'project-portofolio',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
