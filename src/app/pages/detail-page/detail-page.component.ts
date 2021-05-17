import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NetworkInfo} from '../../network/interfaces/network-info';
import {NetworkGeneralService} from '../../network/network-general/network-general.service';
import {MatTableDataSource} from '@angular/material/table';
import {NetworkMemberService} from '../../network/network-member/network-member.service';
import {NetworkMemberResponse} from '../../network/interfaces/network-member-response';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.sass']
})
export class DetailPageComponent implements OnInit {

  currentNetworkId = '-1';
  networks: NetworkInfo[] = [];
  currentNetwork: NetworkInfo | null = null;
  memberDataSource = new MatTableDataSource<NetworkMemberResponse>([]);
  displayedColumns = ['sn', 'name', 'attribute', 'vpn', 'ip', 'actions'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkGeneralService,
    private memberService: NetworkMemberService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(params => this.currentNetworkId = params.networkid),
      switchMap(params => this.memberService.getNetworkMembers(+params.networkid)),
      tap(members => this.memberDataSource.data = members),
      switchMap(() => this.networkService.listNetworks()),
      tap(networks => {
        this.networks = networks;
        this.currentNetwork = this.networks.filter(network => network.networkid === +this.currentNetworkId)[0];
      })
    ).subscribe();
  }

}
