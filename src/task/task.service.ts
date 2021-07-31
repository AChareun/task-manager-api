import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TaskService {
  private taskList: Task[] = [];

  public getAllTasks(): Task[] {
    return this.taskList;
  }

  private setAllTasks(taskList: Task[]): void {
    this.taskList = taskList;
  }

  public getTaskById(id: string): Task {
    const task = this.taskList.find((t) => t.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  public getTasksWithFilter(filterData: TaskFilterDto): Task[] {
    const { status, search } = filterData;
    let tasks = [...this.getAllTasks()];

    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (t) => t.title.includes(search) || t.description.includes(search),
      );
    }

    return tasks;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.getAllTasks().push(newTask);

    return newTask;
  }

  public deleteTaskById(id: string): void {
    this.setAllTasks(this.getAllTasks().filter((t) => t.id !== id));
  }

  public updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
