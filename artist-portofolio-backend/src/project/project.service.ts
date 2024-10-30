import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { Project } from './project.entity';
import { ProjectFilterDto } from './dto/project-filter.dto';
import { join } from 'path';
import { ProjectResponseDto } from './dto/project-response.dto';
import * as fs from 'fs';
import { FileService } from './files.service';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private fileService: FileService,
  ) {}

  async createProject(
    createProjectDto: CreateUpdateProjectDto,
    files: Express.Multer.File[],
  ): Promise<Project> {
    await this.fileService.createNewDirectory(
      '',
      createProjectDto.title,
      files,
    );

    let image = this.fileService.getImagePath(createProjectDto.title);
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

    let imagesLink = await this.fileService.getImagesLink(project.title);

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      link: project.link,
      status: project.status,
      imagesLink,
    };
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

  async getVisibleProjects(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.getVisibleProjects();

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

    if (files.length > 0) {
      await this.fileService.createNewDirectory(
        project.title,
        updateProjectDto.title,
        files,
      );
    } else {
      await this.fileService.renameFolder(
        project.title,
        updateProjectDto.title,
      );
    }

    project.image = this.fileService.getImagePath(updateProjectDto.title);
    Object.assign(project, updateProjectDto);

    await this.projectRepository.save(project);
    return project;
  }

  async deleteProjectById(id: string): Promise<void> {
    const project = await this.projectRepository.findOne({ where: { id } });
    const result = await this.projectRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }

    await this.fileService.removeDirectory(project.title);
  }

  private getImagesLink(title: string): string[] {
    let images = fs.readdirSync(join(__dirname, '..', '..', 'uploads', title));

    images = images.map(
      (link) => `http://localhost:3000/uploads/${title}/${link}`,
    );

    return images;
  }
}
