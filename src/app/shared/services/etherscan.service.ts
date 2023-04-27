import { Injectable } from '@angular/core';

// HTTP
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable, Subscription, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

// EVN
import { environment } from 'src/environments/environment';

@Injectable()
export class EtherscanService {
  // COINMARKETCAP
  key = 'ff6885d4-2006-4483-8313-a1463935d350';
  api = '/api/c/';
  address = '0xdac17f958d2ee523a2206206994597c13d831ec7';
  options = {
    method: 'GET',
    qs: {
      symbol: 'ETH'
    },
    headers: {
      'X-CMC_PRO_API_KEY': `${this.key}`
    },
    json: true,
    gzip: true
  };
  constructor(private http: HttpClient) {
  }

  getContract(): Observable<Subscription> {
    const route = environment.production ? `${this.api}` : `${this.api}cryptocurrency/quotes/latest?id=1`;

    return this.http.get(route, this.options)
      .pipe(map((res: any) => res.data[1]), catchError((res: Response) => this._errorHandler(res)));
  }

  private _errorHandler(res: Response): Observable<string> {
    const statusCode = res.status;
    const error = {
      statusCode,
      error: res['message']
    };
    if (!environment.production) {
      console.error(error);
    }
    return throwError(error || 'Server Error');
  }
}
