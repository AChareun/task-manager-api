import { TaskStatus } from '../task.model';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
