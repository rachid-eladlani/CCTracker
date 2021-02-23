import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '../alert';
import { AlertService } from '../service/data/alert.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})

export class AlertListComponent implements OnInit {

  alerts: Alert[];
  message: string;
  private username : string; 

  constructor(
    private alertService:AlertService,
    private authenticationService: AuthenticationService,
    private router : Router
  ) { }

  ngOnInit() {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.refreshAlerts();
  }

  refreshAlerts(){
    this.alertService.retrieveAlert(this.username).subscribe(
      response => {
        console.log(JSON.parse(response["alerts"]));
        this.alerts = JSON.parse(response["alerts"]);
      }
    )
  }

  deleteAlert(id) {
    console.log(`delete Alert ${id}` )
    this.alertService.deleteAlert(id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of Alert ${id} Successful!`;
        this.refreshAlerts();
      }
    )
  }

  updateAlert(id) {
    console.log(`update ${id}`)
    this.router.navigate(['alerts',id])
  }

  addAlert() {
    this.router.navigate(['alerts',-1])
  }
}