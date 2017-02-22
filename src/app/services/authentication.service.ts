import {Injectable} from "@angular/core";
import {contentHeaders} from "../common/headers";
import {Http} from "@angular/http";
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

    private baseUrl: string = 'http://vps354544.ovh.net:8090';

    constructor(private http: Http, public authHttp: AuthHttp) {}

  login(username: string, password: string)  {
    let body = JSON.stringify({login: username,pass: password});
    return this.http.post(`${this.baseUrl}/login`, body, {headers : contentHeaders})
      .map(
        response => {
          localStorage.setItem('id', response.json().id);
          localStorage.setItem('login', response.json().login);
          localStorage.setItem('id_token', response.json().token);
        }
      )
  }

  changePassword(newPassword: string) {

    var id_user = localStorage.getItem('id');
    var id_user2 = parseInt(id_user);
    let body = JSON.stringify({user: {id: id_user2}, newPass: newPassword});

    return this.authHttp.put(`${this.baseUrl}/l/users`, body)
      .map( res => res.json());

  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('login');
    localStorage.removeItem('id_token');
  }

}
