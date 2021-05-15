import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {NetworkService} from '../interfaces/network-service';
import {AuthService} from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkServiceService {

  private readonly apiServer = environment.apiServer;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getAccountInfo(): Observable<NetworkService> {
    return this.http.get<NetworkService>(`${this.apiServer}api/service`, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }
}
