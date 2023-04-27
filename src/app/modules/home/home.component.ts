import { AfterViewInit, Component, OnInit } from '@angular/core';

// SEO
import { Meta, Title } from '@angular/platform-browser';

// OWL CAROUSEL
import { OwlOptions } from 'ngx-owl-carousel-o';

// SERVICES
import { EtherscanService } from 'src/app/shared/services';

// PARALLAX
import * as Parallax from 'parallax-js';
declare var Parallax: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  tCap;
  tvolume;
  tSupply;
  tPrice;

  roadMapOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      }
    },
    nav: false
  };


  constructor(
    private title: Title,
    private meta: Meta,
    public ES: EtherscanService) {
    this.title.setTitle('Hybrid DeFi Token - Uni Cash');
    this.meta.updateTag({ name: 'description', content: 'Hybrid smart coin for both the financial and common investor. Buy, sell, and trade into all forms of stable coin securely.' });
  }

  ngOnInit(): void {
    this.etherCalls();

  }

  ngAfterViewInit(): void {
    const scene = document.getElementById('coins');
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true,
      hoverOnly: true,
      inputElement: document.getElementById('tokenomics')
    });

    parallaxInstance.friction(0.2, 0.2);
  }

  etherCalls(): void {
    this.ES.getContract().subscribe((res) => {
      this.tvolume = this._numberWithCommas(res['quote'].USD['volume_24h']);
      this.tPrice = this._numberWithCommas(res['quote'].USD['price']);
      this.tCap = this._numberWithCommas(res['quote'].USD['market_cap']);
      this.tSupply = this._numberWithCommas(res['total_supply']);
    });
  }

  private _numberWithCommas(x): number {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
}
