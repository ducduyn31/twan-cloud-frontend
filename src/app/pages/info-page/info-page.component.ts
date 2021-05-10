import {AfterViewInit, Component} from '@angular/core';
import {NetworkGeneralService} from '../../network/network-general/network-general.service';
import {Observable} from 'rxjs';
import {NetworkInfo} from '../../network/interfaces/network-info';

@Component({
  selector: 'app-info',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.sass']
})
export class InfoPageComponent implements AfterViewInit {

  networks: NetworkInfo[] = [];

  constructor(private networkGeneralService: NetworkGeneralService) {
  }

  ngAfterViewInit() {
    this.networkGeneralService.listNetworks().subscribe(
      n => {
        this.networks = n;
      }
    );
  }

}
