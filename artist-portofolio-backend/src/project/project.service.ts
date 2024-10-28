import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { Project } from './project.entity';
import { ProjectFilterDto } from './dto/project-filter.dto';

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  createProject(createProjectDto: CreateUpdateProjectDto): Promise<Project> {
    return this.projectRepository.createProject(createProjectDto);
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async getProjects(projectDto: ProjectFilterDto): Promise<Project[]> {
    return this.projectRepository.getProjects(projectDto);
  }

  async updateProject(
    id: string,
    updateProjectDto: CreateUpdateProjectDto,
  ): Promise<Project> {
    const project = await this.getProjectById(id);

    Object.assign(project, updateProjectDto);

    await this.projectRepository.save(project);
    return project;
  }

  async deleteProjectById(id: string): Promise<void> {
    const result = await this.projectRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }
}
