import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';

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
    return this.taskList.find((t) => t.id === id);
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

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
