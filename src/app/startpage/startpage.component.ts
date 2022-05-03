import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  tasks = [];
  unsortedTasks = [];
  task: any = 
    {
      title: "",
      description: "",
      checked: "",
      date: ""
    };
    // these 2 Arrays are used for showing the icons beside the input fields. 
    // they are filled with true, when the user edit the input fields
  titleInProgress = [];
  descriptionInProgress = []; 


  constructor(private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.loadTasks();
  }


  addTask() {
    this.task.checked = false;
    this.task.date = new Date().getTime();
    this.firestore
    .collection('tasks')
    .add(this.task)
    this.clearInputfield();
    this.loadTasks();
  }


  clearInputfield(){
    this.task.title = '';
    this.task.description = '';
  }


  loadTasks(){
    this.firestore
    .collection('tasks')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes: any) => {
      this.unsortedTasks = changes;
      this.sortTasks()
    });
  }


  editText(event: any, i: number, field: string){
    let task = this.tasks[i]
    if(field == 'title'){
      task.title = event;
    } else if (field == 'description'){
      task.description = event;
    }
  }


  saveChanges(i: number, field: string){
    let task = this.tasks[i];
    this.firestore
    .collection('tasks')
    .doc(task.customIdName)
    .update(task)
    .then(() => {
      if(field == 'title'){
        this.titleInProgress[i] = false;
      } else if (field == 'description'){
        this.descriptionInProgress[i] = false;
      }
      this.loadTasks();
    });
  }


  deleteTask(i: number){
    let task = this.tasks[i];
    this.firestore
    .collection('tasks')
    .doc(task.customIdName)
    .delete()
  }


  changeStatus(i: number){
    let task = this.tasks[i];
    task.checked = true;
    task.date = new Date().getTime();
    this.firestore
    .collection('tasks')
    .doc(task.customIdName)
    .update(task)
    .then(() => {
      this.loadTasks()
    })
  }


  sortTasks(){
    let openTasksUnsorted = this.unsortedTasks.filter((task) => task.checked === false);
    let doneTasksUnsorted = this.unsortedTasks.filter((task) => task.checked === true);
    let openTasks = openTasksUnsorted.sort((a,b)=> b.date - a.date);
    let doneTasks = doneTasksUnsorted.sort((a,b)=> b.date - a.date);
    this.tasks = [...openTasks, ...doneTasks];
  }
}
