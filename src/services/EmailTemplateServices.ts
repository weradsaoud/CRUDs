import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './GenericService';
import { JobTitle } from 'src/models/JobTitle';
import { endPoints } from 'src/apiUrls/endPoints';
import { EmailTemplate } from 'src/models/EmailTemplate';


@Injectable({ providedIn: 'root' })
export class EmailTemplateService extends GenericService<EmailTemplate> {
  constructor(private http: HttpClient) {
    super(http, EmailTemplate, endPoints.emailTemplate);
  }
}
