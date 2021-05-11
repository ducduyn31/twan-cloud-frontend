import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface MemberInfo {
  sn: string;
  name: string;
  bindPhone: boolean;
  attribute: string;
  vpn: boolean;
  ip: string;
}

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.sass']
})
export class DetailPageComponent implements OnInit {

  dataSource = new MatTableDataSource<MemberInfo>([
    {
      sn: '615029679381',
      name: 'TWIN',
      bindPhone: true,
      attribute: 'hardware',
      vpn: true,
      ip: '10.168.1.1'
    }
  ]);
  displayedColumns = ['sn', 'name', 'bindPhone', 'attr', 'vpn', 'ip', 'operating'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
