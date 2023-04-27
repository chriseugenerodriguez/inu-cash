import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  top = true;
  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef
  onElementScroll() {
    this._onScroll();
  }

  constructor() { }

  ngOnInit(): void {
  }

  scrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      this.top = pos >= 0 ? true : false;

      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 7);
  }

  _onScroll(): void {
    const pos = window.pageYOffset;
    this.top = pos <= 0 ? true : false;
  }
}

