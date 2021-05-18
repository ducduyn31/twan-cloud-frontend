import { Component, OnInit } from '@angular/core';
import {NetworkMemberService} from '../../network/network-member/network-member.service';
import {HardwareMemberGeneralInfoResponse, SoftwareMemberGeneralInfoResponse} from '../../network/interfaces/member-general-info-response';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DeviceListComponent} from '../../components/device-list/device-list.component';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.sass']
})
export class MembersPageComponent implements OnInit {

  hardwareList: HardwareMemberGeneralInfoResponse[] = [];
  serverList: SoftwareMemberGeneralInfoResponse[] = [];
  hardwareDatasource = new MatTableDataSource<HardwareMemberGeneralInfoResponse>();
  softwareDatasource = new MatTableDataSource<SoftwareMemberGeneralInfoResponse>();
  hardwareDisplayedColumns = ['name', 'sn', 'network', 'labels', 'net_ip', 'public_ip', 'firmware', 'actions'];
  serverDisplayedColumns = ['name', 'sn', 'network', 'net_ip', 'public_ip', 'firmware', 'actions'];

  constructor(private networkMemberService: NetworkMemberService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateMembers();
  }

  openDeviceListDialog(sn: string): void {
    this.dialog.open(DeviceListComponent, {
      data: {
        sn,
      }
    });


  }

  removeMember(sn: string, networkid: number): void {
    this.networkMemberService.removeFromNetwork(sn, networkid).pipe(
      tap(() => this.updateMembers()),
    ).subscribe();
  }

  private updateMembers(): void {
    this.networkMemberService.getAllMembers().subscribe(
      (memberList) => {
        const allHardware = memberList.filter(member => 'sn' in member) as HardwareMemberGeneralInfoResponse[];
        const allServers = memberList
          .filter(member => 'vpnid' in member && member.vpnid.startsWith('S')) as SoftwareMemberGeneralInfoResponse[];
        this.hardwareList = allHardware;
        this.serverList = allServers;
        this.hardwareDatasource.data = this.hardwareList;
        this.softwareDatasource.data = this.serverList;
      }
    );
  }
}
