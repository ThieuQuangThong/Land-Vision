import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  selectedDistrict: string ='';
  selectedWards: string ='';
  selectedStreet: string ='';
  selectedAddress: string ='';

  onDropdownChange() {

    this.selectedAddress = `${this.selectedDistrict}, ${this.selectedWards}, ${this.selectedStreet}`;
  }

  ngOnInit() {}
}
