import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {ToastsManager} from "ng2-toastr";
import {UserGroupsService} from "../services/user.groups.service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-my-groups',
  templateUrl: 'user.groups.component.html',
  styleUrls: ['user.groups.component.css'],
})
export class UserGroupsComponent  implements OnInit{

  userGroups:  Object;
  userOwnerGroups: Object;
  newGroup:  any = {};
  generateUseres: any = {};
  inviteUser: any = {};
  userInvitations: Object;

  constructor(public http: Http, private userGroupService: UserGroupsService, private toastr: ToastsManager) {}

  loadMyGroups(){

    this.userGroupService.loadUserGroups()
      .subscribe(
        userGroups => this.userGroups = userGroups,
        error => {this.toastr.error(error.json().message)}
      );
  }

  loadCreatedGroups() {

    this.userGroupService.loadOwnerGroups()
      .subscribe(
        userOwnerGroups => this.userOwnerGroups = userOwnerGroups,
        error => {this.toastr.error(error.json().message)}
      );

  }

  createGroup(){

    this.userGroupService.createGroup(this.newGroup.name, this.newGroup.description, this.newGroup.prefix, this.newGroup.visibility)
      .subscribe(
        data => {
          this.loadMyGroups();
          this.loadCreatedGroups();
          this.toastr.success('Grupa '+ this.newGroup.name +' dodana pomyślnie!')
        },
        error => this.toastr.error(error.json().message)
      );
  }

  deleteGroup(group) {

    this.userGroupService.deleteGroup(group.id)
      .subscribe(
        data => {
          this.loadMyGroups();
          this.loadCreatedGroups();
          this.toastr.success('Grupe usunięto pomyślnie!')
        },
        error => this.toastr.error(error.json().message)
      );
  }

  generateUsers(){

    this.userGroupService.generateUsers(this.generateUseres.targetGroup, this.generateUseres.organiser, this.generateUseres.contractor)
      .subscribe(
        data => this.toastr.success('Wygenerowano pomyślnie!'),
        error => this.toastr.error(error.json().message)
      )

  }

  inviteToGroup(){

    this.userGroupService.inviteUser(this.inviteUser.targetGroup, this.inviteUser.invitedUserId, this.inviteUser.role)
      .subscribe(
        data => this.toastr.success('Zaproszenie wysłano!'),
        error => this.toastr.error(error.json().message)
      )
  }

  loadUserInvitations() {

    this.userGroupService.loadInvitations()
      .subscribe(
        userInvitations => this.userInvitations = userInvitations
      ),
      error => {this.toastr.error(error.json().message)}
  }

  acceptInvitation(invitation) {

    invitation.stance = 'ACCEPTED';

    this.userGroupService.changeInvitationsStatus(invitation)
      .subscribe(
        data => {
          this.loadUserInvitations();
          this.loadMyGroups();
          this.toastr.success('Zaprosznie zaakceptowano!')
        },
        error => {this.toastr.error(error.json().message)}
      )
  }

  declineInvitation(invitation) {

    invitation.stance = 'DECLINED';

    this.userGroupService.changeInvitationsStatus(invitation)
      .subscribe(
        data => {
          this.loadUserInvitations();
          this.loadMyGroups();
          this.toastr.success('Zaprosznie odrzucono!')
        },
        error => {this.toastr.error(error.json().message)}
      )

  }

  ngOnInit(){
    this.loadMyGroups();
    this.loadCreatedGroups();
    this.loadUserInvitations();
  }

}
