import { IsEnum, IsNotEmpty } from '@nestjs/class-validator';
import { ProjectStatus } from '../project.entity';

export class CreateUpdateProjectDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
