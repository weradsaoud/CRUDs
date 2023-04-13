export abstract class SharedProperties<T> {

  public id?: number;
  public updatedBy?: number;
  public updatedOn?: string;
  public clientData?: string;

  constructor(model?: Partial<T>) {
    if (model) Object.assign(this, model);
  }

  public toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }
}
