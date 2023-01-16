export interface ResponseCompanyLegalForm {
  success: boolean;
  data: CompanyLegalForm[];
  message: string;
}

export interface CompanyLegalForm {
  id: number;
  empresa_forma_legalNOMBRE: string;
  empresa_forma_legalCODIGO: string;
  created_at: string;
  updated_at: string;
}