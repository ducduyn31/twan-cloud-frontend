import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {NetworkMemberResponse} from '../interfaces/network-member-response';
import {AuthService} from '../../authentication/services/auth.service';
import {HardwareMemberGeneralInfoResponse, SoftwareMemberGeneralInfoResponse} from '../interfaces/member-general-info-response';

@Injectable({
  providedIn: 'root'
})
export class NetworkMemberService {

  private readonly apiServer = environment.apiServer;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getNetworkMembers(network: number): Observable<NetworkMemberResponse[]> {
    return this.http.get<NetworkMemberResponse[]>(`${this.apiServer}api/network/${network}/members`, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }

  public getAllMembers(): Observable<Array<HardwareMemberGeneralInfoResponse | SoftwareMemberGeneralInfoResponse>> {
    return this.http.get<Array<HardwareMemberGeneralInfoResponse | SoftwareMemberGeneralInfoResponse>>(`${this.apiServer}api/members`, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }

  public removeFromNetwork(member: string, network: number): Observable<{ code: number }> {
    return this.http.post<{ code: number }>(`${this.apiServer}api/member/remove`, {
      member,
      networkid: network,
    }, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }
}
