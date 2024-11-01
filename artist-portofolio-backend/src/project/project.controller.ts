import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { Project } from './project.entity';
import { ProjectFilterDto } from './dto/project-filter.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProjectResponseDto } from './dto/project-response.dto';
import { AuthGuard } from '@nestjs/passport';

const fileFilter = (req, file, callback) => {
  const validTypes = ['image/jpeg', 'image/png'];
  if (validTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException('Only JPEG and PNG files are allowed!'),
      false,
    );
  }
};

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      fileFilter: fileFilter,
    }),
  )
  async createProject(
    @Body() createProjectDto: CreateUpdateProjectDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDto, files);
  }

  @Get('/visible')
  getVisibleProjects(): Promise<ProjectResponseDto[]> {
    return this.projectService.getVisibleProjects();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getProjectById(@Param('id') id: string): Promise<ProjectResponseDto> {
    return this.projectService.getProjectById(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  getProjects(
    @Query() projectDto: ProjectFilterDto,
  ): Promise<ProjectResponseDto[]> {
    return this.projectService.getProjects(projectDto);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('file', 10, { fileFilter: fileFilter }))
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: CreateUpdateProjectDto,
    @UploadedFiles()
    files: Express.Multer.File[],
  ): Promise<Project> {
    return this.projectService.updateProject(id, updateProjectDto, files);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteProjectById(@Param('id') id: string): Promise<void> {
    return this.projectService.deleteProjectById(id);
  }
}
