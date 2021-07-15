import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {NetworkInfo} from '../interfaces/network-info';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkGeneralService {

  private readonly apiServer = environment.apiServer;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getNetworkInfo(): Observable<NetworkInfo | { [k: string]: string }> {
    return of({test: 'ok'});
  }

  public listNetworks(): Observable<NetworkInfo[]> {
    return this.http.get<NetworkInfo[]>(`${this.apiServer}api/v2/networks`, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }

  public getNetworkUsed(networkId: number): Observable<any> {
    return this.http.get(`${this.apiServer}api/v2/network/${networkId}/state`, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }
}
