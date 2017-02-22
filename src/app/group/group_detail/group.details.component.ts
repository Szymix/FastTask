import {Component, OnInit} from '@angular/core';
import {GroupsService} from "../../services/group.service";
import {ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {Pipe} from "@angular/core/src/metadata/directives";


@Component({
  selector: 'app-group-details-list',
  templateUrl: 'group.details.component.html',
  styleUrls: ['group.details.component.css']
})


export class GroupsDetailsComponent {

  group_detail: any;
  group_tasks: Object;

  constructor(private  groupService: GroupsService, private route: ActivatedRoute, private toastr: ToastsManager){}

  loadGroupDetail(id_group: string){
    this.groupService.loadGroupDetail(id_group)
      .subscribe(
        group_detail => this.group_detail = group_detail,
      );
  }

  joinGroup(){
    this.groupService.joinGroup(this.group_detail[0].id)
        .subscribe(
            data => this.toastr.success('Dołączono do grupy pomyślnie!',),
            err => this.toastr.error(err.json().message)
        )
  }

  loadGroupTasks(id_group: string){
    this.groupService.loadGroupTasks(id_group)
      .subscribe(
        group_tasks => this.group_tasks = group_tasks
      );
  }

  public ngOnInit(){
    this.route.params
        .subscribe(
            (data:any) =>{
              this.loadGroupDetail(data.id);
              this.loadGroupTasks(data.id);
            }
        )
  }

}
