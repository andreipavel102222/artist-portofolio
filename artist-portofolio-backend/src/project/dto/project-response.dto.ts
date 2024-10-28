import { ProjectStatus } from '../project.entity';

export class ProjectResponseDto {
  id: string;
  title: string;
  description: string;
  link: string;
  status: ProjectStatus;
  imagesLink: string[];
}
