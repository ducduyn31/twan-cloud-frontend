import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {NetworkInfo} from '../interfaces/network-info';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkGeneralService {

  constructor(private http: HttpClient) {
  }

  public getNetworkInfo(): Observable<NetworkInfo | { [k: string]: string }> {
    return of({test: 'ok'});
  }

  public listNetworks(): Observable<NetworkInfo[]> {
    const token = 'eyJhbGciOiJIUzUxMiIsInIiOjgxNTMwMDYxOSwidHlwIjoiSldUIn0.eyJleHAiOjE2MjA0NDIyMTMsImlzYSI6MTYyMDQ0MDQxMywiaXNzIjoidnAtb3JheXNoYi0xNTEiLCJyb2xlIjo0LCJ1aWQiOjIzOTI4MzY0LCJzZXIiOiJhdXRoLXYyLm9yYXkuY29tIiwibnMiOiJ1c2VyIn0.sUnNUX_wqBbOSDcr8VYx5AkUrH1UeTaJAK7l3FYdn_tcbTg8BCV_DmI2FjZ5mu9HDQnY92pQmQfGbk9ToAlfTg';
    return this.http.get<NetworkInfo[]>('https://pgy-api.oray.com/product/network/list', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  }
}
