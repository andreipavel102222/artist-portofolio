import { Test } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { FileService } from './files.service';
import { ProjectStatus } from './project.entity';

const mockProject = {
  id: '1',
  title: 'test title',
  description: 'test description',
  link: 'test link',
  status: ProjectStatus.VISIBLE,
};

const mockProjectRepository = () => ({
  getProjects: jest.fn(),
  getVisibleProjects: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  createProject: jest.fn(),
});

const mockFileService = () => ({
  getImagesLink: jest.fn(),
  removeDirectory: jest.fn(),
  createNewDirectory: jest.fn(),
  getImagePath: jest.fn(),
});

describe('TasksService', () => {
  let projectService: ProjectService;
  let projectRepostory;
  let fileService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: FileService, useFactory: mockFileService },
        { provide: ProjectRepository, useFactory: mockProjectRepository },
      ],
    }).compile();

    projectService = module.get(ProjectService);
    projectRepostory = module.get(ProjectRepository);
    fileService = module.get(FileService);
  });

  describe('getProjects', () => {
    it('calls getProjects and return the result', async () => {
      expect(projectRepostory.getProjects).not.toHaveBeenCalled();
      projectRepostory.getProjects.mockResolvedValue([]);
      await projectService.getProjects(null);
      expect(projectRepostory.getProjects).toHaveBeenCalled();
    });
  });

  describe('getVisibleProjects', () => {
    it('calls getVisibleProjects and return the result', async () => {
      expect(projectRepostory.getVisibleProjects).not.toHaveBeenCalled();
      projectRepostory.getVisibleProjects.mockResolvedValue([]);
      await projectService.getVisibleProjects();
      expect(projectRepostory.getVisibleProjects).toHaveBeenCalled();
    });
  });

  describe('getProjectById', () => {
    it('calls method from repository and return the results', async () => {
      projectRepostory.findOne.mockResolvedValue(mockProject);
      fileService.getImagesLink.mockResolvedValue(['test title']);

      const result = await projectService.getProjectById('id');

      expect(result).toEqual({ ...mockProject, imagesLink: ['test title'] });
    });

    it('calls method from repository and throw error', () => {
      projectRepostory.findOne.mockResolvedValue(null);
      expect(projectService.getProjectById('id')).rejects.toThrow(
        'Project not found',
      );
    });
  });

  describe('deleteProjectById', () => {
    it('calls method from repository and from file service', async () => {
      projectRepostory.delete.mockResolvedValue({ affected: 1 });
      projectRepostory.findOne.mockResolvedValue(mockProject);

      await projectService.deleteProjectById('id');

      expect(projectRepostory.findOne).toHaveBeenCalled();
      expect(projectRepostory.delete).toHaveBeenCalled();
      expect(fileService.removeDirectory).toHaveBeenCalled();
    });

    it('calls method from repository and throw error', () => {
      projectRepostory.delete.mockResolvedValue({ affected: 0 });
      projectRepostory.findOne.mockResolvedValue(null);

      expect(projectService.deleteProjectById('id')).rejects.toThrow(
        'Project not found',
      );
    });
  });

  describe('createProject', () => {
    it('create project and return it', async () => {
      const projectDtoMock = {
        title: 'title test',
        description: 'description test',
        link: 'link test',
        status: ProjectStatus.VISIBLE,
      };

      fileService.getImagePath.mockResolvedValue('title test');
      projectRepostory.createProject.mockResolvedValue({
        ...projectDtoMock,
        image: 'image',
      });

      const result = await projectService.createProject(projectDtoMock, []);
      expect(result).toEqual({ ...projectDtoMock, image: 'image' });
    });
  });
});
