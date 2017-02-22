import {Component, OnInit} from '@angular/core';
import {GroupsService} from "../../services/group.service";
import {ToastsManager} from "ng2-toastr";


@Component({
  selector: 'app-groups-list',
  templateUrl: 'group.list.component.html',
  styleUrls: ['group.list.component.css']
})
export class GroupsListComponent implements OnInit{

  group_list: any;
  loading: boolean;

  constructor(private groupService: GroupsService, private toastr: ToastsManager) {}

  loadAllGroups(){

    this.loading = true;
    this.groupService.loadAllGroups()
        .subscribe(
          group_list => this.group_list = group_list,
        );
    this.loading = false;
  }

  joinGroup(){
    this.groupService.joinGroup(this.group_list[0].id)
      .subscribe(
        data => this.toastr.success('Dołączono do grupy pomyślnie!',),
        err => this.toastr.error(err.json().message)
      )
  }

  public ngOnInit() {
    this.loadAllGroups();
  }

}
