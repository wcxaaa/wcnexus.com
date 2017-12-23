import { Component, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

// services
import { TranslateService } from '@ngx-translate/core';

import { ThemeService } from './_services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MediaMatcher]
})
export class AppComponent implements OnDestroy { 

  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('sideNavContainer') sideNavContainer: any; // MatSidenavContainer

  mobileQuery: MediaQueryList;
  _mobileQueryListener: () => void;
  navList: any[] = [
    {
      title: "index",
      link: "/index",
      exterior: false // set to true if a use "href=" attr, to false to use "routerLink="
    },
    {
      title: "venture",
      link: "/",
      exterior: true
    }
  ];

  constructor(
		private translateService: TranslateService,
    public themeService: ThemeService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    // ng material2 cdk media fetch
    this.mobileQuery = media.matchMedia('(max-width: 992px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // i18n
    translateService.addLangs(["en", "zh"]);
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang('en');
    let browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|zh/) ? browserLang : 'en');
  }

  openSideNav = async () => {
    this.sideNavContainer._element.nativeElement.style.display = 'block';
    await this.sidenav.open();
  };

  // closeSideNav = async () => {
  //   await this.sidenav.close();
  //   console.log('sidenav closed');
  //   this.sideNavContainer._element.nativeElement.style.display = 'none';
  // };

  closeSideNav = async () => {
    await this.sidenav.close();
    this.sideNavContainer._element.nativeElement.style.display = 'none';
  };

  // setSideNavToTop = (switchToTop: boolean) => {
  //   // switchToTop? this.sideNavContainer._element.nativeElement.style.zIndex = '150':
  //   //  this.sideNavContainer._element.nativeElement.style.zIndex = '0';
  //   switchToTop? this.sideNavContainer._element.nativeElement.style.display = 'block':
  //    this.sideNavContainer._element.nativeElement.style.display = 'none';
  // }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}