import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = "";

  constructor(private authenticationService :AuthenticationService) { }

  ngOnInit() {
    this.name = this.authenticationService.getAuthenticatedUserName();
    console.log(this.name);
  }

}
