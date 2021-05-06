import {AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('sideNavTemplatePortalContent') sideNavContent!: TemplateRef<any>;
  @ViewChild('mainTemplatePortalContent') mainContent!: TemplateRef<any>;

  sideNavPortal!: TemplatePortal;
  contentPortal!: TemplatePortal;

  menus = Object.values(environment.sideNav);

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngAfterViewInit(): void {
    this.sideNavPortal = new TemplatePortal<any>(
      this.sideNavContent,
      this.viewContainerRef,
    );
    this.contentPortal = new TemplatePortal<any>(
      this.mainContent,
      this.viewContainerRef,
    );
  }

}
