import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { rmdir, writeFile, mkdir, readdir } from 'fs/promises';

@Injectable()
export class FileService {
  async removeDirectory(title: string): Promise<void> {
    try {
      const dirName = join(__dirname, '..', '..', 'uploads', title);
      await rmdir(dirName, { recursive: true });
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async createNewDirectory(
    oldTitle: string,
    newTitle: string,
    files: Express.Multer.File[],
  ): Promise<void> {
    try {
      if (oldTitle !== '') await this.removeDirectory(oldTitle);

      const uploadPath = join(__dirname, '..', '..', 'uploads', newTitle);
      await mkdir(uploadPath, { recursive: true });

      for (const file of files) {
        await writeFile(`${uploadPath}/${file.originalname}`, file.buffer);
      }
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getImagesLink(title: string): Promise<string[]> {
    let images: string[];
    try {
      images = await readdir(join(__dirname, '..', '..', 'uploads', title));
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return images;
  }

  getImagePath(title: string) {
    return join(__dirname, '..', '..', 'uploads', title);
  }
}
