import { SharedProperties } from "./SharedProperties";

export class EmailTemplate extends SharedProperties<EmailTemplate> {

  public arName!: string;
  public enName!: string
  public status!: boolean;
  public isGlobal!: boolean;
  public enSubjectTemplate!: string;
  public enBodyTemplate!: string;
  public arSubjectTemplate!: string;
  public arBodyTemplate!: string;

  constructor(model: Partial<EmailTemplate>) {
    super(model);
  }
}
