import {Component, Inject, OnInit} from '@angular/core';
import {NetworkMemberService} from '../../network/network-member/network-member.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HardwareMemberGeneralInfoResponse, SoftwareMemberGeneralInfoResponse} from '../../network/interfaces/member-general-info-response';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.sass']
})
export class DeviceListComponent implements OnInit {

  displayedColumns = ['name', 'type', 'mac', 'ip'];
  deviceDatasource = new MatTableDataSource();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string}, private networkMemberService: NetworkMemberService) { }

  ngOnInit(): void {
    this.networkMemberService.getMemberDevices(this.data.id).subscribe(data => this.deviceDatasource.data = data);
  }

}
