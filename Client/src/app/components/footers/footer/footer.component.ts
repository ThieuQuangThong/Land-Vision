import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {
  date = new Date().getFullYear();
  constructor(private router: Router) {}

  ngOnInit(): void {

  }
  redirectToDiscord() {
    // const discordLink = 'https://discord.gg/hjQFGP7HP4';
    // this.router.navigateByUrl('https://discord.gg/hjQFGP7HP4');
    this.router.navigateByUrl('https://zalo.me/0794217184')
  }
}
