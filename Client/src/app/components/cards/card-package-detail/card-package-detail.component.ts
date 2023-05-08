import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VipService } from 'src/app/_service/vip.service';
import { VipModel } from 'src/app/models/vip-model';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardPackageTableComponent } from '../card-package-table/card-package-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { VipRequestModel } from 'src/app/models/vip-request-model';


@Component({
  selector: 'app-card-package-detail',
  templateUrl: './card-package-detail.component.html',
  styleUrls: ['./card-package-detail.component.css']
})
export class CardPackageDetailComponent implements OnInit {
  package: VipModel = new VipModel()
  packageId: number = 0;
  dataSourcePackage = new MatTableDataSource<any>();
  vipRequestModel = new VipRequestModel();
  packageName : string = ""
  packagePrice : number = 0
  packagePostLimit : number = 0
  vipResponse: VipModel[] = [];

  constructor ( private route: ActivatedRoute, private vipService : VipService, public dialogRef : MatDialogRef<CardPackageTableComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { id:  number }){}

  ngOnInit(): void {
    this.packageId = this.data.id;
    this.vipService.getVipById(this.packageId)
    .subscribe(
      respone => {
        this.package = respone;

      })
  }

  deletePackage(packageId : number){
    this.vipService.deleteVip(packageId).subscribe(
      () => {
        this.vipResponse = this.vipResponse.filter(x => x.id !== packageId);
        this.dataSourcePackage = new MatTableDataSource(this.vipResponse);
      }
    );
  }
}
