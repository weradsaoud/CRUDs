import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './GenericService';
import { JobTitle } from 'src/models/JobTitle';
import { endPoints } from 'src/apiUrls/endPoints';


@Injectable({ providedIn: 'root' })
export class JobTitleService extends GenericService<JobTitle> {
  constructor(private http: HttpClient) {
    super(http, JobTitle, endPoints.jobTitle);
  }
}
