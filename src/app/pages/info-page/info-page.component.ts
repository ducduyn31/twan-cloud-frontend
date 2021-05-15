import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {NetworkGeneralService} from '../../network/network-general/network-general.service';
import {asapScheduler, interval, Observable, Subject} from 'rxjs';
import {NetworkInfo} from '../../network/interfaces/network-info';
import {tap} from 'rxjs/operators';
import {NetworkServiceService} from '../../network/service-general/network-service.service';
import {NetworkService} from '../../network/interfaces/network-service';

@Component({
  selector: 'app-info',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.sass']
})
export class InfoPageComponent implements AfterViewInit, OnDestroy {

  networks: NetworkInfo[] = [];
  accountInfo: Partial<NetworkService> = {};
  $networkState: Subject<{ networkId: number, client: number, router: number, server: number }> = new Subject();
  $stateInterval: Observable<any> = interval(5000, asapScheduler);
  networkState: { [networkId: string]: { client: number, router: number, server: number } } = {};

  constructor(private networkGeneralService: NetworkGeneralService, private networkService: NetworkServiceService) {
  }

  ngAfterViewInit(): void {

    this.networkService.getAccountInfo().subscribe(
      info => this.accountInfo = info,
    );

    this.networkGeneralService.listNetworks().pipe(
      tap(networks => this.networks = networks),
      tap(networks => {
        networks.forEach(network => this.networkGeneralService.getNetworkUsed(network.networkid).pipe(
          tap((onlineState) => this.$networkState.next({
            networkId: network.networkid,
            ...onlineState,
          }))
        ).subscribe());
      }),
      // switchMap((networks) => interval(5000, asapScheduler).pipe(
      //   tap(
      //     () => {
      //       networks.map(network => this.networkGeneralService.getNetworkUsed(network.networkid).pipe(
      //         tap((onlineState) => this.$networkState.next({
      //           networkId: network.networkid,
      //           ...onlineState,
      //         }))
      //       ).subscribe());
      //     }
      //   )
      // )),
    ).subscribe();

    this.$networkState.subscribe(
      state => {
        this.networkState[state.networkId] = {
          client: state.client,
          router: state.router,
          server: state.server,
        };
      }
    );
  }

  ngOnDestroy(): void {
    this.$networkState.complete();
  }

}
