import { Info } from "./Info";
import { JobTitle } from "./JobTitle";
import { SharedProperties } from "./SharedProperties";

export class JobTitleFull extends SharedProperties<JobTitleFull>{

  public statusDateModified?: string;
  public jobType?: number;
  public statusInfo?: Info;
  public typeInfo?: Info;

  constructor(model?: Partial<JobTitle>) {
    if (model) {
      super(model);
      Object.assign(this, model);
    }
  }
}
