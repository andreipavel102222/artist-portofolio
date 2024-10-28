import { DataSource, Repository } from 'typeorm';
import { Project, ProjectStatus } from './project.entity';
import { Injectable } from '@nestjs/common';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { ProjectFilterDto } from './dto/project-filter.dto';

@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(private dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }

  async createProject(
    createProjectDto: CreateUpdateProjectDto,
  ): Promise<Project> {
    const { title, description, image, link } = createProjectDto;

    const project = this.create({
      title,
      description,
      image,
      link,
      status: ProjectStatus.VISIBLE,
    });

    await this.save(project);
    return project;
  }

  async getProjects(projectDto: ProjectFilterDto): Promise<Project[]> {
    const { search } = projectDto;
    let query = this.createQueryBuilder('project');

    if (search) {
      query.andWhere(
        '(LOWER(project.title) LIKE LOWER(:search) OR LOWER(project.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    const projects = await query.getMany();
    return projects;
  }
}