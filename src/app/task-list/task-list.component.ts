import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: any[];
  unsortedTasks: any[];
  // these 2 Arrays are used for showing the icons beside the input fields. 
  // they are filled with true, when the user edit the input fields
  titleInProgress = [];
  descriptionInProgress = []; 
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks()
  }


  loadTasks() {
    this.taskService.loadTasks().subscribe((tasks) => {
      this.unsortedTasks = tasks;
      console.log(this.unsortedTasks);
      this.tasks = this.taskService.sortTasks(this.unsortedTasks);
    });
  }


  saveChanges(id: any, field: string, i: number){
    let task = this.tasks.filter((task) => task.customIdName == id);
    this.taskService.saveChanges(id, task);
      if(field == 'title'){
        this.titleInProgress[i] = false;
      } else if (field == 'description'){
        this.descriptionInProgress[i] = false;
      }
  }


  deleteTask(id: any){
    this.taskService.deleteTask(id);
  }


  changeStatus(id: any){
    let task: any = this.tasks.filter((task) => task.customIdName == id);
    task[0].checked = true;
    task[0].date = new Date().getTime();
    this.taskService.saveChanges(id, task[0]);
  }


  editText(event: Event, i: number, field: string){
    let task = this.tasks[i]
    if(field == 'title'){
      task.title = event;
    } else if (field == 'description'){
      task.description = event;
    }
  }

  trackByFn(item){
    return item.customIdName;
  }
}
