import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {
    this.password= "password"
   }
   password: any;
   show = false;

   OnClick(){
     if(this.password === 'password'){
       this.password = 'text';
       this.show = true;
     }else{
       this.password = 'password';
       this.show = false
     }
   }
}
