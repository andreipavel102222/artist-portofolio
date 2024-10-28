import { ProjectStatus } from '../project.entity';

export class CreateUpdateProjectDto {
  title: string;
  description: string;
  link: string;
  status: ProjectStatus;
}
