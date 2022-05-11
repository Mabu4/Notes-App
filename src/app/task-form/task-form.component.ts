import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent{

  task: Task = 
    {
      title: '',
      description: '',
      checked: false,
      date: 0,
      customIdName: ''
    }
  
  constructor(private taskService: TaskService) { }


  addTask(){
    this.taskService.addTask(this.task);
    this.clearInputfield();
    // this.loadTasks();
  }


  clearInputfield(){
    this.task.title = '';
    this.task.description = '';
  }

}
