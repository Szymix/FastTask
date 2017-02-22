import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {contentHeaders} from "../common/headers";

@Injectable()
export class RegisterService{

    private baseUrl: string = 'http://vps354544.ovh.net:8090';

  constructor(private http: Http){}

  register(username: string, password: string)  {
    let body = JSON.stringify({ login: username, pass: password });
    return this.http.post(`${this.baseUrl}/registration`, body, {headers : contentHeaders})
      // .map(response => response.json()),
      // error => {
      //   console.log(error.text());
      // }

  }

}
