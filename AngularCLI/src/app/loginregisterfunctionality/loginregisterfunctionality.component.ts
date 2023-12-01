import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loginregisterfunctionality',
  templateUrl: './loginregisterfunctionality.component.html',
  styleUrls: ['./loginregisterfunctionality.component.css']
})
export class LoginregisterfunctionalityComponent {
  name: string ="";
  address: string ="";
  phone: Number =0;

  constructor(private http: HttpClient)
  {

  }
  register()
  {
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone
    };
    this.http.post("http://localhost:8086/user/create", bodyData, {responseType: 'text'}).subscribe((resultData: any) =>
    {
      console.log(resultData);
      alert("Congratulations! Registaration was Success!");
      this.name = '';
      this.address = '';
      this.phone = 0;
    });
  }
}``
