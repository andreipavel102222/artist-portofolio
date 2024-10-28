import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ProjectStatus {
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  link: string;

  @Column()
  status: ProjectStatus;
}
