import { DataSource, Repository } from 'typeorm';
import { Project, ProjectStatus } from './project.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { ProjectFilterDto } from './dto/project-filter.dto';

@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(private dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }

  async createProject(
    createProjectDto: CreateUpdateProjectDto,
    image: string,
  ): Promise<Project> {
    const { title, description, link, status } = createProjectDto;

    const project = this.create({
      title,
      description,
      image,
      link,
      status,
    });

    try {
      await this.save(project);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Project exists');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
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

  async getVisibleProjects(): Promise<Project[]> {
    let query = this.createQueryBuilder('project').where(
      'project.status = :status',
      { status: ProjectStatus.VISIBLE },
    );
    const projects = await query.getMany();
    return projects;
  }
}
