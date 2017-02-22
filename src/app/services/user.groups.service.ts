import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class UserGroupsService{

  userGroups: Object;
  userOwnerGroups: Object;
  generatedUsers: Object;
  invitedUser: Object;
  userInvitations: Object;

  private baseUrl: string = 'http://vps354544.ovh.net:8090';

  constructor(public http: Http, public authHttp: AuthHttp) {}

  loadUserGroups(){

    var id_user = localStorage.getItem('id');

    return this.authHttp.get(`${this.baseUrl}/l/groups/search&member_id=`+id_user)
        .map((res: Response) =>
          this.userGroups = res.json()
        );
  }

  loadOwnerGroups(){

    var id_user = localStorage.getItem('id');

    return this.authHttp.get(`${this.baseUrl}/l/groups/search&owner_id=`+id_user)
      .map((res: Response) =>
        this.userOwnerGroups = res.json()
      );
  }

  createGroup(name: string, description: string, prefix: string, visibility: string){

    var id_user = localStorage.getItem('id');

    let body = JSON.stringify({name: name, description: description, owner: {id: id_user}, prefix: prefix, visibility: visibility});
    return this.authHttp.post(`${this.baseUrl}/l/groups`, body)
      .map(res => res.json());
  }

  deleteGroup(id_group: string) {

    let body = JSON.stringify({id: id_group});
    let options = new RequestOptions({body: body});
    return this.authHttp.delete(`${this.baseUrl}/l/groups`, options)
  }

  generateUsers(id_group: number, organiserNumber: number, contractorNumber: number){

    let body = JSON.stringify({groupID: id_group, organiser: organiserNumber, contractor: contractorNumber});
    return this.authHttp.post(`${this.baseUrl}/l/groups/members`, body)
      .map(res => res.json());
  }

  loadGeneratedUsers(id_group: string){

    return this.authHttp.get(`${this.baseUrl}/l/groups/report/`+ id_group)
      .map((res : Response) =>
        this.generatedUsers = res.json());
  }

  inviteUser(id_group: string, invitedUser: string, role: string) {

    var id_user = localStorage.getItem('id');

    let body = JSON.stringify({group:{ id: id_group}, invitedLogin: invitedUser, role: role, submitter: {id: id_user}});
    return this.authHttp.post(`${this.baseUrl}/l/groups/invitations/v2`, body)
      .map(res => res.json());
  }

  loadInvitations() {

    return this.authHttp.get(`${this.baseUrl}/l/groups/invitations`)
      .map((res : Response) =>
        this.userInvitations = res.json());
  }

  changeInvitationsStatus(invitation) {

    let body = JSON.stringify(invitation)
    return this.authHttp.put(`${this.baseUrl}/l/groups/invitations`, body)

  }
}
