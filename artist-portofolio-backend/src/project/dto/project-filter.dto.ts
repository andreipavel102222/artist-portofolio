import { IsOptional, IsString } from '@nestjs/class-validator';

export class ProjectFilterDto {
  @IsOptional()
  @IsString()
  search: string;
}
