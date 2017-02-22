import {Component, OnInit} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {Http} from "@angular/http";
import {UserTasksService} from "../services/user.tasks.service";
import {UserGroupsService} from "../services/user.groups.service";
import {Input} from "@angular/core/src/metadata/directives";



@Component({
  selector: 'app-my-tasks',
  templateUrl: 'user.tasks.component.html',
  styleUrls: ['user.tasks.component.css']
})
export class UserTasksComponent implements OnInit {

  executorAssignedTasks: Object;
  executorAcceptedTasks: Object;
  executorDoneTasks: Object;
  userOptionGroups: Object;
  newTask: any = {};
  ordererTasks: any[];
  optionalFields: any = {};

  constructor(public http: Http, private userGroupService: UserGroupsService, private userTasksService: UserTasksService, private toastr: ToastsManager) {

  }

  selectTargetGroups() {

    this.userGroupService.loadUserGroups()
      .subscribe(
        userOptionGroups => this.userOptionGroups = userOptionGroups,
      );
  }

  loadCreatedTasks() {

    this.userTasksService.loadOrdererTasks()
      .subscribe(
        ordererTasks => this.ordererTasks = ordererTasks,
        error => this.toastr.error(error.json().message)
      );
  }

  loadExecutorAssignedTasks() {

    this.userTasksService.loadExecutorTasks('ASSIGNED')
      .subscribe(
        executorAssignedTasks => this.executorAssignedTasks = executorAssignedTasks,
        error => this.toastr.error(error.json().message)
      );
  }

  loadExecutorAcceptedTasks() {

    this.userTasksService.loadExecutorTasks('ACCEPTED')
      .subscribe(
        executorAcceptedTasks => this.executorAcceptedTasks = executorAcceptedTasks,
        error => this.toastr.error(error.json().message)
      );
  }

  loadExecutorDoneTasks() {

    this.userTasksService.loadExecutorTasks('DONE')
      .subscribe(
        executorAcceptedTasks => this.executorDoneTasks = executorAcceptedTasks,
        error => this.toastr.error(error.json().message)
      );
  }

  createTask() {

    this.userTasksService.createTask(this.newTask.name, this.newTask.startDate, this.newTask.executor, this.newTask.endDate, this.newTask.targetGroup, this.newTask.description,
      this.newTask.keyField1, this.newTask.valueField1, this.newTask.keyField2, this.newTask.valueFiled2)
      .subscribe(
        data => {
          this.loadCreatedTasks();
          this.loadExecutorAssignedTasks();
          this.toastr.success('Zadanie ' + this.newTask.name + ' utworzono pomyślnie!')
        },
        error => {this.toastr.error(error.json().message)}
      );
  }

  // addOptions(task) {
  //
  //   // task.options = this.optionalFields = [
  //   //   {'key': this.optionalFields.keyField1,'value': this.optionalFields.valueField1},
  //   //   {'key': this.optionalFields.keyField2,'value': this.optionalFields.valueField2},
  //   //   {'key': this.optionalFields.keyField3,'value': this.optionalFields.valueField3},
  //   //   {'key': this.optionalFields.keyField4,'value': this.optionalFields.valueField4},
  //   //   {'key': this.optionalFields.keyField5,'value': this.optionalFields.valueField5}];
  //
  //   console.log(task);
  //
  //   this.userTasksService.addOptionsList(task)
  //     .subscribe(
  //       data => {
  //         this.loadCreatedTasks();
  //         this.toastr.success('Pola dodano pomyślnie!')
  //       }
  //     );
  //
  // }

  deleteTask(task) {

    this.userTasksService.deleteTask(task.id)
      .subscribe(
        data => {
          this.loadCreatedTasks();
          this.loadExecutorAssignedTasks();
          this.toastr.success('Zadanie usunięto pomyślnie!')
        }
      );
  }

  acceptTask(task) {

    task.progress = 'ACCEPTED';
    this.userTasksService.changeProgressTask(task)
      .subscribe(
        data => {
          this.loadExecutorAssignedTasks();
          this.loadExecutorAcceptedTasks();
          this.toastr.success('Zadanie zaakceptowano!');
        }
      );
  }

  declinedTask(task) {

    task.progress = 'DECLINED';
    this.userTasksService.changeProgressTask(task)
      .subscribe(
        data => {
          this.loadExecutorAssignedTasks();
          this.loadExecutorAcceptedTasks();
          this.toastr.success('Zadanie odrzucno!');
        }
      );
  }

  doneTask(task) {

    task.progress = 'DONE';
    this.userTasksService.changeProgressTask(task)
      .subscribe(
        data => {
          this.loadExecutorAcceptedTasks();
          this.loadExecutorDoneTasks();
          this.toastr.success('Zadanie oznaczono jako wykonane!');
        }
      );
  }


  ngOnInit() {
    this.loadCreatedTasks();
    this.loadExecutorAssignedTasks();
    this.loadExecutorAcceptedTasks();
    this.loadExecutorDoneTasks();
    this.selectTargetGroups();
  }

}
