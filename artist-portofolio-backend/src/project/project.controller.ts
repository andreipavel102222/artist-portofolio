import {
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
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { Project } from './project.entity';
import { ProjectFilterDto } from './dto/project-filter.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { ProjectResponseDto } from './dto/project-response.dto';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @UseInterceptors(
    // move in service
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folderName = req.body.title;
          const uploadPath = join(__dirname, '..', '..', 'uploads', folderName);
          mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Limităm la 5 MB pe fișier
    }),
  )
  async createProject(
    @Body() createProjectDto: CreateUpdateProjectDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    _file: Express.Multer.File[],
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('/visible')
  getVisibleProjects(): Promise<ProjectResponseDto[]> {
    return this.projectService.getVisibleProjects();
  }

  @Get('/:id')
  getProjectById(@Param('id') id: string): Promise<ProjectResponseDto> {
    return this.projectService.getProjectById(id);
  }

  @Get()
  getProjects(
    @Query() projectDto: ProjectFilterDto,
  ): Promise<ProjectResponseDto[]> {
    return this.projectService.getProjects(projectDto);
  }

  @Put('/:id')
  @UseInterceptors(FilesInterceptor('file', 10))
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: CreateUpdateProjectDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<Project> {
    return this.projectService.updateProject(id, updateProjectDto, files);
  }

  @Delete('/:id')
  deleteProjectById(@Param('id') id: string): Promise<void> {
    return this.projectService.deleteProjectById(id);
  }
}
