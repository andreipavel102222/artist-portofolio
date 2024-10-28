import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { Project } from './project.entity';
import { ProjectFilterDto } from './dto/project-filter.dto';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  async createProject(
    @Body() createProjectDto: CreateUpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('/:id')
  getProjectById(@Param('id') id: string): Promise<Project> {
    return this.projectService.getProjectById(id);
  }

  @Get()
  getProjects(@Query() projectDto: ProjectFilterDto): Promise<Project[]> {
    return this.projectService.getProjects(projectDto);
  }

  @Put('/:id')
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: CreateUpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete('/:id')
  deleteProjectById(@Param('id') id: string): Promise<void> {
    return this.projectService.deleteProjectById(id);
  }
}
