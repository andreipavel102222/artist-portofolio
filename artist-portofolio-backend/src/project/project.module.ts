import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { FileService } from './files.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AuthModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, FileService],
})
export class ProjectModule {}
