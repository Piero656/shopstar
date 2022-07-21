import { Component } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopstar_app';

  showNav = true;


  constructor(
    private router: Router,
  ) {
    this.get();
  }

  get() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {

        if (event.url.includes('admin')) {
          this.showNav = false;
        }
        else {
          this.showNav = true;

        }

      }
    });
  }




}
