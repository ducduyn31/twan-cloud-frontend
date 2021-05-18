import {Component, Input, OnInit} from '@angular/core';
import {Portal} from '@angular/cdk/portal';
import {AuthService} from '../../authentication/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  @Input() sideNav: Portal<any> | null = null;
  @Input() contentTemplate: Portal<any> | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.signOut();
  }

}
