import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoints } from 'src/apiUrls/endPoints';
import { IUser } from 'src/models/IUser';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: IUser): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(endPoints.login, user)
      .pipe(map((result) => result));
  }
}
