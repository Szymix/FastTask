import {Injectable} from "@angular/core";
import {AuthHttp} from 'angular2-jwt';
import {Http, Response, RequestOptions} from "@angular/http";

@Injectable()
export class UserTasksService {

  userTasks: Object;

  private baseUrl: string = 'http://vps354544.ovh.net:8090';

  constructor(public http: Http, public authHttp: AuthHttp) {
  }

  loadOrdererTasks() {

    var user = localStorage.getItem('id');
    return this.authHttp.get(`${this.baseUrl}/l/tasks/search&orderer_id=` + user)
      .map((res: Response) =>
        this.userTasks = res.json()
      );
  }

  loadExecutorTasks(progress: string) {

    var user = localStorage.getItem('id');
    return this.authHttp.get(`${this.baseUrl}/l/tasks/search&executor_id=` + user + `,progress=` + progress)
      .map((res: Response) =>
        this.userTasks = res.json()
      );
  }

  createTask(taskName: string, taskStartDate: string, executor: string, taskEndDate: string, taskTargetGroup: string, taskDescription: string, key1: string, value1: string,  key2: string, value2: string) {

    var user = localStorage.getItem('id');
    let body = JSON.stringify({
      title: taskName,
      orderer: {id: user},
      executor: {login: executor},
      startDate: taskStartDate + 'T23:59:00.000Z',
      endDate: taskEndDate + 'T23:59:00.000Z',
      group: {id: taskTargetGroup},
      options :[{key: key1, value: value1 }, {key: key2, value: value2 }],
      description: taskDescription
    })
    return this.authHttp.post(`${this.baseUrl}/l/tasks`, body)
      .map(res => res.json()
      );
  }

  // addOptionsList(task) {
  //
  //   let body = JSON.stringify(task);
  //   console.log(body);
  //   // return this.authHttp.put(`${this.baseUrl}/l/tasks` ,body)
  //   //   .map(res => res.json()
  //   //   );
  // }

  deleteTask(id_task: string) {

    let body = JSON.stringify({id: id_task});
    let options = new RequestOptions({body: body});
    return this.authHttp.delete(`${this.baseUrl}/l/tasks`, options)
  }

  changeProgressTask(task){

    let body = JSON.stringify(task);
    return this.authHttp.post(`${this.baseUrl}/l/tasks`, body)
  }

}
