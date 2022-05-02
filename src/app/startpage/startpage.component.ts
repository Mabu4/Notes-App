import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  tasks = [];
  task = 
    {
      title: "",
      description: "",
      status: ""
    };
  titleInProgress = [];
  descriptionInProgress = []; 


  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.loadTasks();
  }


  addTask() {
    this.task.status = 'toDo';
    this.firestore
    .collection('tasks')
    .add(this.task)
    this.clearInputfield();
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
      this.tasks = changes;
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

  saveChanges(i: number){
    let task = this.tasks[i];
    this.firestore
    .collection('tasks')
    .doc(task.customIdName)
    .update(task)
    .then(() => {
      this.loadTasks();
    });
  }

}
