import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class GroupsService{

    group_list: Object;
    group_detail: any;
    group_users: Object;

    private baseUrl: string = 'http://vps354544.ovh.net:8090';

  constructor(public http: Http, public authHttp: AuthHttp) {}

      loadAllGroups() {

      return this.authHttp.get(`${this.baseUrl}/l/groups`)
        .map((res: Response) =>
          this.group_list = res.json()
        );
      }

      loadGroupDetail(id_group: string) {

      return this.authHttp.get(`${this.baseUrl}/l/groups/search&id=`+id_group)
        .map((res: Response) =>
          this.group_detail = res.json()
        );
      }

      joinGroup(id_group: string){

        let body = JSON.stringify({ id: id_group });
        return this.authHttp.post(`${this.baseUrl}/l/groups/join`, body)
      }

      loadGroupTasks(id_group: string){

        return this.authHttp.get(`${this.baseUrl}/l/tasks/search&group_id=`+id_group)
          .map((res: Response) =>
            this.group_users = res.json()
          );
      }
  }
