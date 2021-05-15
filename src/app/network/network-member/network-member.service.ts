import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {NetworkMemberResponse} from '../interfaces/network-member-response';
import {NetworkInfo} from '../interfaces/network-info';
import {AuthService} from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkMemberService {

  private readonly apiServer = environment.apiServer;

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getNetworkMembers(network: number): Observable<NetworkMemberResponse[]> {
    return this.http.get<NetworkMemberResponse[]>(`${this.apiServer}api/network/${network}/members`, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }
}
