import { Component, OnInit } from '@angular/core';
import {NetworkMemberService} from '../../network/network-member/network-member.service';
import {HardwareMemberGeneralInfoResponse} from '../../network/interfaces/member-general-info-response';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.sass']
})
export class MembersPageComponent implements OnInit {

  hardwareList: HardwareMemberGeneralInfoResponse[] = [];
  hardwareDatasource = new MatTableDataSource<HardwareMemberGeneralInfoResponse>();
  displayedColumns = ['name', 'sn', 'network', 'net_ip', 'public_ip', 'firmware', 'actions'];

  constructor(private networkMemberService: NetworkMemberService) { }

  ngOnInit(): void {
    this.networkMemberService.getAllMembers().subscribe(
      (memberList) => {
        const allHardware = memberList.filter(member => 'sn' in member) as HardwareMemberGeneralInfoResponse[];
        this.hardwareList.push(...allHardware);
        this.hardwareDatasource.data = this.hardwareList;
      }
    );
  }

}
