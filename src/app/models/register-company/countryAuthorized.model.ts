export interface ResponseCountry {
  success: boolean;
  data: CountryAuthorized[];
  message: string;
}

export interface CountryAuthorized {
  id: number;
  paisNOMBRE: string;
  paisISO3: string;
  paisISO2: string;
  paisINDICATIVO: string;
  paisCAPITAL: string;
  paisMONEDA: string;
  paisHABITADO: number;
}