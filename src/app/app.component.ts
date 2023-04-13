import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/AuthService';
import { EmailTemplate } from 'src/models/EmailTemplate';
import { EmailTemplateService } from 'src/services/EmailTemplateServices';
import { Observable } from 'rxjs';
import { JobTitle } from 'src/models/JobTitle';
import { JobTitleService } from 'src/services/jobTitleService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'CRUDs';
  jobTitle: JobTitle = new JobTitle({});
  emailTemplate: EmailTemplate = new EmailTemplate({});

  constructor(
    private authService: AuthService,
    private emailTemplateservice: EmailTemplateService,
    private jobTitleService: JobTitleService
  ) { }

  ngOnInit(): void {
    this.authService.login({
      lang: "AR",
      userName: "cdiadmin",
      userPassword: "P@ssw0rd"
    }).subscribe((result) => {
      console.log("login result: ", result);
      //console.log("login result: ", result.rs.token);
      localStorage.setItem("token", result.token);

      //get job-titles
      this.jobTitleService.get().subscribe({
        next: result => {
          console.log('all job-titles: ', result);
        },
        error: err => {
          console.error('all job-titles err: ', err);
        }
      });
      //get job-title by Id
      let getJobTitleId = 44;
      this.jobTitleService.getById(getJobTitleId).subscribe({
        next: result => {
          console.log(`job-title with id ${getJobTitleId}: `, result);
          this.jobTitle = new JobTitle({
            id: result.id,
            arName: result.arName,
            enName: result.enName,
            isSystem: false,
            status: 1
          });
        },
        error: err => {
          console.error("job-title with id Err: ", err);
        }
      });
      let jobTitle: JobTitle = new JobTitle({
        arName: `وراد_${new Date().valueOf()}`,
        enName: `werad_${new Date().valueOf()}`,
        isSystem: false,
        status: 1
      });
      //create job-title
      this.jobTitleService.create(jobTitle).subscribe({
        next: result => {
          console.log("created job title: ", result);
        },
        error: err => {
          console.error("created job title Err: ", err)
        }
      });
      //update job-title
      let updatedJobTitle = new JobTitle({ ...this.jobTitle, arName: `تعديل_${new Date().valueOf()}`, enName: `update_${new Date().valueOf()}` });
      this.jobTitleService.update(updatedJobTitle).subscribe({
        next: (result) => {
          console.log("job-title: ", this.jobTitle, "was uapdated successfully to: ", result);
        },
        error: (err) => {
          console.error("update job-tite Err: ", err);
        }
      });
      //delete job-title
      // this.jobTitleService.delete(1).subscribe({
      //   next: (result) => {
      //     console.log("delete job-title: ", result);
      //   },
      //   error: (err) => {
      //     console.error("err delete job-title: ", err);
      //   }
      // });
      //get emailtemplates
      this.emailTemplateservice.get().subscribe({
        next: (result) => {
          console.log("all emailtemplates: ", result);
        },
        error: (err) => {
          console.error("Err get email templates: ", err);
        }
      });
      //get emailtemplate by id
      let getEmailTemplateId = 22;
      this.emailTemplateservice.getById(getEmailTemplateId).subscribe({
        next: (result) => {
          console.log(`get email template by id ${getEmailTemplateId}: `, result);
          this.emailTemplate = new EmailTemplate({
            id: result.id,
            arName: result.arName,
            enName: result.enName,
            arBodyTemplate: result.arBodyTemplate,
            enBodyTemplate: result.enBodyTemplate,
            arSubjectTemplate: result.arSubjectTemplate,
            enSubjectTemplate: result.enSubjectTemplate,
            isGlobal: result.isGlobal,
            status: result.status
          });
          console.log("get this.emailTemplate: ", this.emailTemplate);

        },
        error: (err) => {
          console.error("Err in get email template by id: ", err);
        }
      });
      //create email template
      let createEmailTemplate: EmailTemplate = new EmailTemplate(
        {
          arName: "ar",
          enName: "werad email",
          status: true,
          isGlobal: true,
          enSubjectTemplate: "important ya zalameh",
          enBodyTemplate: " important ya zalameh body ",
          arSubjectTemplate: "ar",
          arBodyTemplate: "ar"
        }
      );
      this.emailTemplateservice.create(createEmailTemplate).subscribe({
        next: (result) => {
          console.log("created emailTemplate: ", result);
        },
        error: err => {
          console.error("created job title error: ", err);
        }
      });
      //update email template
      console.log("this.emailTemplate: ", this.emailTemplate);
      let updateEmailTemplate = new EmailTemplate({
        id: 41,
        arName: `تعديل_${new Date().valueOf()}`,
        enName: `update_${new Date().valueOf()}`,
        status: true,
        isGlobal: true,
        enSubjectTemplate: "important ya zalameh",
        enBodyTemplate: " important ya zalameh body ",
        arSubjectTemplate: "ar",
        arBodyTemplate: "ar"
      });
      console.log("updateEmailTemplate: ", updateEmailTemplate);

      this.emailTemplateservice.update(updateEmailTemplate).subscribe({
        next: (result) => {
          console.log("updated email template: ", result);
        },
        error: (err) => {
          console.error("Err update email template: ", err);
        }
      });
      //delete emailTemplate
      // this.emailTemplateservice.delete(1).subscribe({
      //   next: (result) => {
      //     console.log("delete job-title: ", result);
      //   },
      //   error: (err) => {
      //     console.error("err delete job-title: ", err);
      //   }
      // });

    });
  }

  saveEmailTemplate(emailTemplate: EmailTemplate): Observable<EmailTemplate> {
    return this.emailTemplateservice.create(emailTemplate);
  };

}
