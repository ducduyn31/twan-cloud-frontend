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

  public getNetworkMembers(network: number | string): Observable<NetworkMemberResponse[]> {
    return this.http.get<NetworkMemberResponse[]>(`${this.apiServer}api/v2/network/${network}/members`, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }

  public getAllMembers(requiresNotInNetwork: boolean = false): Observable<Array<HardwareMemberGeneralInfoResponse
    | SoftwareMemberGeneralInfoResponse>> {
    return this.http
      .get<Array<HardwareMemberGeneralInfoResponse | SoftwareMemberGeneralInfoResponse>>(
        `${this.apiServer}api/v2/members${requiresNotInNetwork ? '?notInNetwork=0' : ''}`,
        {
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

  public addToNetwork(member: string, network: number, center: boolean): Observable<{ code: number }> {
    return this.http.post<{ code: number }>(`${this.apiServer}api/member/add`, {
      member,
      networkid: network,
      iscenter: center,
      groupid: 0,
      type: 0,
    }, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }

  public getMemberDevices(member: string): Observable<any> {
    return this.http.get(`${this.apiServer}api/member/${member}/devices`, {
      headers: {
        authorization: `${this.authService.currentToken}`,
      }
    });
  }
}
