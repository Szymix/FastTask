import { Component, OnInit } from '@angular/core';
import {UserGroupsService} from "../services/user.groups.service";
import {AuthenticationService} from "../services/authentication.service";
import { FormsModule } from '@angular/forms';
import {ToastsManager} from "ng2-toastr";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  generatedUsers: Object;
  selectGroup: Object;
  raportGroup: any = {};
  newPass: any = {};

  constructor(private userGroupService: UserGroupsService, private authService: AuthenticationService, private toastr: ToastsManager) {}

  private login = localStorage.getItem('login');

  selectTargetGroups() {

    this.userGroupService.loadOwnerGroups()
      .subscribe(
        selectGroup => this.selectGroup = selectGroup
      );
  }

  loadUsers() {

    this.userGroupService.loadGeneratedUsers(this.raportGroup.id_group)
      .subscribe(
        generatedUsers => this.generatedUsers = generatedUsers,
      );
  }

  changePass() {

    this.authService.changePassword(this.newPass.password)
      .subscribe(
        newPass => {
          this.newPass = newPass,
          this.toastr.success('Hasło zmieniono!')
        },
        error => {this.toastr.error(error.json().message)}
      );
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title></title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">
    <h3 align="center">WYGENEROWANI UŻYTKOWNICY</h3>
    <div align="center">
        ${printContents}
    </div>
    </body>
      </html>`
    );
    popupWin.document.close();
  }

  ngOnInit() {
    this.selectTargetGroups();
  }

}
