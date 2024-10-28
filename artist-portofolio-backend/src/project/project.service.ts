import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { Project } from './project.entity';
import { ProjectFilterDto } from './dto/project-filter.dto';
import { join } from 'path';
import { ProjectResponseDto } from './dto/project-response.dto';
import * as fs from 'fs';
import { rmdir, writeFile } from 'fs/promises';
import { mkdirSync } from 'fs';

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async createProject(
    createProjectDto: CreateUpdateProjectDto,
  ): Promise<Project> {
    //refactorizat join(__dirname)
    let image = join(__dirname, '..', '..', 'uploads', createProjectDto.title);
    const project = this.projectRepository.createProject(
      createProjectDto,
      image,
    );

    return project;
  }

  async getProjectById(id: string): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const imagesLink = this.getImagesLink(project.title);
    return { ...project, imagesLink };
  }

  async getProjects(
    projectFilterDto: ProjectFilterDto,
  ): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.getProjects(projectFilterDto);

    const projectsResponses = projects.map((project: Project) => {
      return {
        id: project.id,
        title: project.title,
        description: project.description,
        link: project.link,
        status: project.status,
        imagesLink: this.getImagesLink(project.title),
      };
    });

    return projectsResponses;
  }

  async updateProject(
    id: string,
    updateProjectDto: CreateUpdateProjectDto,
    files: Express.Multer.File[],
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const dirName = join(__dirname, '..', '..', 'uploads', project.title);
    await rmdir(dirName, { recursive: true });

    Object.assign(project, updateProjectDto);
    project.image = join(
      __dirname,
      '..',
      '..',
      'uploads',
      updateProjectDto.title,
    );

    const uploadPath = join(__dirname, '..', '..', 'uploads', project.title);
    mkdirSync(uploadPath, { recursive: true });

    for (const file of files) {
      await writeFile(`${uploadPath}/${file.originalname}`, file.buffer);
    }

    await this.projectRepository.save(project);
    return project;
  }

  async deleteProjectById(id: string): Promise<void> {
    const project = await this.projectRepository.findOne({ where: { id } });
    const result = await this.projectRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }

    const dirName = join(__dirname, '..', '..', 'uploads', project.title);
    await rmdir(dirName, { recursive: true });
  }

  private getImagesLink(title: string): string[] {
    return fs.readdirSync(join(__dirname, '..', '..', 'uploads', title));
  }
}
