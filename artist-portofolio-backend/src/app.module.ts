import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
})
export class AppModule {}
