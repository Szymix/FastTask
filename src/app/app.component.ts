import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {ToastsManager} from "ng2-toastr";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ToastsManager ]
})
export class AppComponent implements OnInit{

  constructor(private router: Router, private authenticationService : AuthenticationService, private toastr : ToastsManager){}

  ngOnInit(){
    if (localStorage.getItem("id_token") !== null) {
      this.navSwitch = !this.navSwitch;
    }
  }

  model: any = {};

  public navSwitch: boolean = false;

  login(){
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        response => {
          this.router.navigate(['groups']);
          this.navSwitch = !this.navSwitch;
          this.toastr.success('Zalogowano pomyślnie!', 'Success');
        },
        error => {
          this.toastr.error(error.json().message, 'Error');
        }
      )
  }

  logout(){
    this.authenticationService.logout();
    this.navSwitch = !this.navSwitch;
    this.router.navigate(['home']);
  }


}

