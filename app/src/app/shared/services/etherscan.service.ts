import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, timeout } from 'rxjs/operators';

@Injectable()
export class EtherscanService {
  constructor(private http: HttpClient) {}
  getContract(): Observable<any> {
    return this.http.get<{url: string; anonKey: string; schema: string}>('/assets/personal-demo.json').pipe(
      switchMap(config => this.http.get<Array<{payload: any}>>(
        config.url + '/rest/v1/demo_content?id=eq.market-quote&select=payload',
        {headers: {apikey: config.anonKey, 'Accept-Profile': config.schema}}
      )), timeout(5000), map(rows => rows[0]?.payload ?? null), catchError(() => of(null))
    );
  }
}
