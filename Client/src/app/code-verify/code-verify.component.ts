import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-verify',
  templateUrl: './code-verify.component.html',
  styleUrls: ['./code-verify.component.css']
})
export class CodeVerifyComponent {
  constructor(private router: Router){}
  route(){
    this.router.navigate(['reset-password'])
  }
}
