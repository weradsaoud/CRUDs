import { JobTitleFull } from "./JobTitleFull";

export class JobTitle extends JobTitleFull {

  public arName!: string;
  public enName!: string;
  public status!: number;
  public isSystem!: boolean;

  constructor(model: Partial<JobTitle>) {
    super(model);
  }
}


