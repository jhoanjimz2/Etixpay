
export interface RootResponseCompanyCategory {
  success: boolean;
  data: ResponseCompanyCategory;
  message: string;
}

interface ResponseCompanyCategory {
  current_page: number;
  data: CompanyCategory[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface CompanyCategory {
  id: number;
  categoria_empresaCODIGO: string;
  categoria_empresaTITULO: string;
  categoria_empresaTITULOES: string;
  categoria_empresaTITULOIT: string;
  categoria_empresaTITULORO: string;
  categoria_empresaTITULORU?: any;
  categoria_empresaICONO?: string;
  categoria_empresaPADRE?: number;
  created_at: string;
  updated_at: string;
  categoria_empresaDESCUENTO: string;
  empresas: Company[];
}

export interface Company {
  empresaCODIGO: string;
  empresaFOTO: string;
  empresaTIPO: string;
  empresaCATEGORIA: number;
  empresaTIPOCATEGORIA: string;
  empresaNOMBRE: string;
  empresaNOMBREMAP: string;
  empresaNUMEROVAT?: any;
  empresaDIRECCION: string;
  empresaPAIS: number;
  empresaCIUDAD: number;
  empresaREFERENCIA?: any;
  empresaLONGITUD: string;
  empresaLATITUD: string;
  empresaREFERENCIACOMERCIAL?: any;
  empresaTELEFONO: string;
  empresaDESCRIPCION: string;
  empresaSUCURSAL?: any;
  empresaMONEDA: number;
  cashbackCLIENTE: string;
  comisionWALLET: string;
  comisionOFERTA?: any;
  created_at: string;
  updated_at: string;
  empresaDIRECCIONLEGAL: string;
  empresaPAISLEGAL: number;
  empresaCIUDADLEGAL: number;
  empresaREPRESENTANTELEGAL: string;
  empresaNIT: string;
  empresaPAGINAWEB: string;
  empresaFOTOPRINCIPALCUADRADA: string;
  empresaFOTOPRINCIPALRECTANGULAR: string;
  empresaRECOMENDADA: number;
  empresaDIRECCIONLEGALIGUAL: number;
  empresaPRIORIDAD?: any;
  empresaNOMBRELEGAL: string;
  empresaTIENDAONLINE: number;
  empresaDESCUENTOCASHBACK: string;
  empresaGANANCIAETIX: string;
  empresaEMAIL: string;
  usuarioAFILIADOSTORE?: any;
  uuid: string;
  favoritos: any[];
}