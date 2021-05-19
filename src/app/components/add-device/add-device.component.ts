import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HardwareMemberGeneralInfoResponse, SoftwareMemberGeneralInfoResponse} from '../../network/interfaces/member-general-info-response';
import {NetworkMemberService} from '../../network/network-member/network-member.service';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.sass']
})
export class AddDeviceComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { networkId: string },
    private networkMemberService: NetworkMemberService) {
  }


  hardwareList: HardwareMemberGeneralInfoResponse[] = [];
  nonNetworkedHardwareList: HardwareMemberGeneralInfoResponse[] = [];
  serverList: SoftwareMemberGeneralInfoResponse[] = [];
  nonNetworkedServerList: SoftwareMemberGeneralInfoResponse[] = [];
  edgeList: any[] = [];
  meshList: any[] = [];
  edgeActionQueue: Map<string, { action: 'add' | 'remove', count: number }> = new Map();
  meshActionQueue: Map<string, { action: 'add' | 'remove', count: number }> = new Map();

  private static insertAction(map: Map<string, { action: 'add' | 'remove', count: number }>, action: 'add' | 'remove', id: string): void {
    // @ts-ignore
    if (!map.has(id) || map.get(id).count === 0) {
      map.set(id, { action, count: 1 });
    } else {
      // @ts-ignore
      const prev = map.get(id).count;
      // @ts-ignore
      if (map.get(id).action === action) {
        map.set(id, { action, count: prev + 1 });
      } else {
        map.set(id, { action, count: prev - 1 });
      }
    }
  }

  ngOnInit(): void {
    this.updateMembers();
  }

  private updateMembers(): void {
    this.networkMemberService.getAllMembers().pipe(
      tap(
        (memberList) => {
          const allHardware = memberList.filter(member => 'sn' in member) as HardwareMemberGeneralInfoResponse[];
          const allServers = memberList
            .filter(member => 'vpnid' in member && member.vpnid.startsWith('S')) as SoftwareMemberGeneralInfoResponse[];
          this.hardwareList = allHardware;
          this.serverList = allServers;
          this.nonNetworkedServerList = this.serverList.filter(s => !s.isnetworked);
          this.nonNetworkedHardwareList = this.hardwareList.filter(s => !s.isnetworked);
        }
      ),
      switchMap(
        (memberList: (HardwareMemberGeneralInfoResponse | SoftwareMemberGeneralInfoResponse)[]) =>
          this.networkMemberService.getNetworkMembers(this.data.networkId).pipe(
            tap(
              (membersInNetwork) => {
                const idsInMesh = membersInNetwork.filter(m => m.clienttype === 1).map(m => m.member);
                const idsInEdges = membersInNetwork.filter(m => m.clienttype === 0).map(m => m.member);

                const hardwareInMesh: HardwareMemberGeneralInfoResponse[] = memberList
                  .filter(member => 'sn' in member && idsInMesh.includes(member.sn))
                  // @ts-ignore
                  .map(member => this.hardwareList.splice(this.hardwareList.findIndex(hw => hw.sn === member.sn), 1)[0]);

                const serverInMesh: SoftwareMemberGeneralInfoResponse[] = memberList
                  .filter(member => 'vpnid' in member && idsInMesh.includes(member.vpnid))
                  .map(member => {
                    // @ts-ignore
                    return this.serverList.splice(this.serverList.findIndex(sv => sv.vpnid === member.vpnid), 1)[0];
                  });

                const hardwareInEdges: HardwareMemberGeneralInfoResponse[] = memberList
                  .filter(member => 'sn' in member && idsInEdges.includes(member.sn))
                  // @ts-ignore
                  .map(member => this.hardwareList.splice(this.hardwareList.findIndex(hw => hw.sn === member.sn), 1)[0]);

                const serverInEdges: SoftwareMemberGeneralInfoResponse[] = memberList
                  .filter(member => 'vpnid' in member && idsInEdges.includes(member.vpnid))
                  // @ts-ignore
                  .map(member => this.serverList.splice(this.serverList.findIndex(sv => sv.vpnid === member.vpnid), 1)[0]);

                this.edgeList = [...serverInEdges, ...hardwareInEdges];
                this.meshList = [...serverInMesh, ...hardwareInMesh];
              }
            )
          )
      )
    ).subscribe();

  }

  drop(event: CdkDragDrop<any, any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      if (event.previousContainer.id === 'edge-list') {
        AddDeviceComponent.insertAction(this.edgeActionQueue, 'remove', event.item.data.sn || event.item.data.vpnid);
      } else if (event.previousContainer.id === 'mesh-list') {
        AddDeviceComponent.insertAction(this.meshActionQueue, 'remove', event.item.data.sn || event.item.data.vpnid);
      }
      if (event.container.id === 'edge-list') {
        AddDeviceComponent.insertAction(this.edgeActionQueue, 'add', event.item.data.sn || event.item.data.vpnid);
      } else if (event.container.id === 'mesh-list') {
        AddDeviceComponent.insertAction(this.meshActionQueue, 'add', event.item.data.sn || event.item.data.vpnid);
      }
    }
  }

  hardwarePredicate(item: CdkDrag): boolean {
    return 'sn' in item.data;
  }

  serverPredicate(item: CdkDrag): boolean {
    return 'vpnid' in item.data && item.data.vpnid.startsWith('S');
  }

  save(): void {
    const edgeKeys = Array.from(this.edgeActionQueue.keys());

    edgeKeys.forEach(key => {
      // @ts-ignore
      if (this.edgeActionQueue.get(key).count > 0) {
        // @ts-ignore
        if (this.edgeActionQueue.get(key).action === 'add') {
          this.networkMemberService.addToNetwork(key, +this.data.networkId, false).subscribe();
        } else {
          this.networkMemberService.removeFromNetwork(key, +this.data.networkId).subscribe();
        }
      }
    });
  }
}

