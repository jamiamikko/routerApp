import { MediaService } from './../services/media.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string = '';
  private password: string = '';

  constructor(private mediaService: MediaService) { }


  login() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.mediaService.setUser(user);
    this.mediaService.login();
  };

  ngOnInit() {
  }

}
