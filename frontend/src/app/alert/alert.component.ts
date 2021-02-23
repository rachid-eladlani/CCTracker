import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../service/data/alert.service';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  allAlerts: []
  allAlertss= ["rachid", "brabuss", "oui"]
  userid: string;
  alertForm:FormGroup

  constructor(private alertService: AlertService,
    private authenticationService: AuthenticationService,public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
      this.initializeAlertForm();
    }

    private initializeAlertForm() {
      this.alertForm = this.formBuilder.group({
        cryptocurrency: ['', Validators.required],
        amount: ['', Validators.required],
        mode: '',
      });
      this.alertService.retrieveAllAlert().subscribe(      
        response => {
          console.log(response["cc"][0].asset_id);
          this.allAlerts = response["cc"].map(item => { return item.asset_id }).slice(0, 20)
          console.log(this.allAlerts);
          
        }
      )
    }

  ngOnInit() {
    
    this.userid = this.authenticationService.getAuthenticatedUser()


  }

  saveAlert() {
    let formData = this.alertForm.getRawValue()
    console.log(this.alertForm.getRawValue().amount)
    if(formData.cryptocurrency == ""){
      return
    }
    this.alertService.createAlert(this.userid, formData.cryptocurrency,formData.amount, formData.mode).subscribe (
      data => {
        
        this.router.navigate(['alerts-list'])
      }
    )
  }

}
