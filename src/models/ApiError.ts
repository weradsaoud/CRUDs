export interface ApiError {
  ec: number;
  eo: {
    arName: string;
    enName: string;
    id: number;
    fnId: string;
    parent: number;
  };
  lm: string[];
  ms: string;
  rn: number;
  sc: number;
  sn: string;
  t: string;
  vn: string;
}
