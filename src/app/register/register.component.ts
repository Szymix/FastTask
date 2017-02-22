import {Component} from '@angular/core';
import {RegisterService} from "../services/registration.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private registerService: RegisterService, private toastr : ToastsManager) { }

  new_user: any = {};


  register(){
    this.registerService.register(this.new_user.username, this.new_user.password)
      .subscribe(
        response => {
          this.router.navigate(['/home']);
          this.toastr.success('Zarejestrowano pomyślnie!', 'Success');
        },
        error => {
          this.toastr.error(error.json().message, 'Error');
        }
      )
  }

}
