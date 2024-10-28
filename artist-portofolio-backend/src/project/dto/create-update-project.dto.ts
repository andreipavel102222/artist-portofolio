import { ProjectStatus } from '../project.entity';

export class CreateUpdateProjectDto {
  title: string;
  description: string;
  image: string;
  link: string;
  status: ProjectStatus;
}
