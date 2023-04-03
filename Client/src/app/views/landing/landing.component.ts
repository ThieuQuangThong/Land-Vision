import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/_service/post.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",


})
export class LandingComponent implements OnInit {
  constructor(private postService:PostService) {

  }

  ngOnInit(): void {

  }

}
