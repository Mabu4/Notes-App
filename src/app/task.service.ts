import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  tasks: any[];
  
  constructor(private firestore: AngularFirestore) { }

  addTask(newTask: Task) {
    newTask.checked = false;
    newTask.date = new Date().getTime();
    this.firestore
    .collection('tasks')
    .add(newTask)
  }

  
  loadTasks(): Observable <any>{
    let tasks = this.firestore
    .collection('tasks')
    .valueChanges({idField: 'customIdName'});
    return tasks;
  }


  saveChanges(id: any, task: any){
    this.firestore
    .collection('tasks')
    .doc(id)
    .update(task[0]);
  }


  deleteTask(id: any){
    this.firestore
    .collection('tasks')
    .doc(id)
    .delete();
  }


  changeStatus(id: any, task: any){
    task.checked = true;
    task.date = new Date().getTime();
    this.firestore
    .collection('tasks')
    .doc(id)
    .update(task[0])
  }


  sortTasks(unsortedTasks){
    let openTasksUnsorted = unsortedTasks.filter((task) => task.checked === false);
    let doneTasksUnsorted = unsortedTasks.filter((task) => task.checked === true);
    let openTasks = openTasksUnsorted.sort((a,b)=> b.date - a.date);
    let doneTasks = doneTasksUnsorted.sort((a,b)=> b.date - a.date);
    this.tasks = [...openTasks, ...doneTasks];
    return this.tasks;
  }
}
