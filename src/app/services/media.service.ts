import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class MediaService {

  private user: any = {};

  constructor(private http: Http, private router: Router) { }

  setUser = (user) => {
    this.user = user;
    console.log(this.user);
  }

  register = () => {
    return this.http.post('http://media.mw.metropolia.fi/wbma/users/', this.user).subscribe(
      resp => {

        const originalData = this.user;

        const dataFromServer = resp.json();

        this.user = dataFromServer;
        console.log(this.user);

        delete originalData['email'];

        console.log(originalData);

        this.setUser(originalData);
        this.login();

      },
      error => {
        console.log(error);
      }
    );
  };

  login = () => {

    return this.http.post('http://media.mw.metropolia.fi/wbma/login', this.user).subscribe(
      resp => {

        const dataFromServer = resp.json();

        this.user = dataFromServer.token;
        console.log(this.user);

        if (localStorage.getItem('user')) {

          this.router.navigate(['front']);

        } else {

          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['front']);

        }
      },
      error => {
        console.log(error);
      }
    );

  }
}
