import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }
}
