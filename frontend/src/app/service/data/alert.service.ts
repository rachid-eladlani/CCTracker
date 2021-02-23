import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'src/app/alert';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) { }

  deleteAlert(alertid){
    return this.http.delete(`${API_URL}/alerts/deletealert/${alertid}`);
  }

  retrieveAlert(userid){
    return this.http.get<Alert[]>(`${API_URL}/alerts/getalerts/${userid}`);
  }

  retrieveAllAlert(){
    return this.http.get<Alert[]>(`${API_URL}/alerts/getallCC/`);
  }

  updateAlert(alertid, name, amount, mode){
    return this.http.put(`${API_URL}/alerts/updatealert/${alertid}`,'{ "cryptocurrency": "'+ name+ '", "amount":"'+amount+'", "mode":"'+mode+'" }');
  }

  createAlert(userid, name, amount, mode){
    return this.http.post(`${API_URL}/alerts/addalert/${userid}`, '{ "cryptocurrency": "'+ name+ '", "amount":"'+amount+'", "mode":"'+mode+'" }' );
  }
}
