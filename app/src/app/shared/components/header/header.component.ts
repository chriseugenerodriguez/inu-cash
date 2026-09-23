import { Component, OnDestroy, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  top = true;
  private scrollFrame = 0;
  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef
  onElementScroll() {
    this._onScroll();
  }

  constructor() { }

  ngOnInit(): void {
  }

  scrollTop(): void {
    this.cancelScroll();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  scrollToSection(event: MouseEvent, id: string): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    const target = document.getElementById(id);
    if (!target) { return; }
    event.preventDefault();
    this.cancelScroll();
    if (window.location.hash !== '#' + id) {
      window.history.pushState(window.history.state, '', '#' + id);
    }
    const start = window.scrollY;
    const end = Math.max(0, Math.min(
      start + target.getBoundingClientRect().top - 24,
      document.documentElement.scrollHeight - window.innerHeight
    ));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: end, behavior: 'auto' });
      return;
    }
    const duration = 1100;
    const started = performance.now();
    const step = (now: number): void => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      // Each frame must be immediate; CSS smooth scrolling would restart the animation.
      window.scrollTo({ top: start + (end - start) * eased, behavior: 'instant' as ScrollBehavior });
      this.scrollFrame = progress < 1 ? requestAnimationFrame(step) : 0;
    };
    this.scrollFrame = requestAnimationFrame(step);
  }

  @HostListener('window:wheel')
  @HostListener('window:touchstart')
  @HostListener('window:keydown')
  cancelScroll(): void {
    cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = 0;
  }

  ngOnDestroy(): void {
    this.cancelScroll();
  }

  _onScroll(): void {
    const pos = window.pageYOffset;
    this.top = pos <= 0 ? true : false;
  }
}

