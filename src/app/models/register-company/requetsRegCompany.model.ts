

export class RequestRegCompany {

    empresaCODIGO: string;

    // Autorizacion
                                            //  isRepresentativeLegal: string;
    empresaTIENDAONLINE: string;            //  isRepresentativeLegal: string;
    empresaCATEGORIA: string;               //  idCategory: string
    empresaPAGINAWEB: string;               //  linkWebSide?: string;
    companyRepresentative: boolean

    // Contacto
    empresaEMAIL: string;                   //   email: string;
    empresaTELEFONO: string;                //   codeCountry: number + phone: string;
    empresaCOMMUNITYCODE: string;

    // Informacion fiscal
    empresaNOMBRE: string;                  //   companyName: string;
    empresa_forma_legalID: string           //   idlegalRepresentative: number;
    empresaREPRESENTANTELEGAL: string;      //   legalRepresentative: string;
    empresaNIT: string;                     //   taxNumber: string;
    empresaNOMBRELEGAL: string;             //   legalForm: number;                      
    empresaDIRECCIONLEGAL: string;          //   legalAddress: string;
    empresaLONGITUDLEGAL: string;           //   geoLegalAddress: { latitude: number, longitude: number };
    empresaLATITUDLEGAL: string;            //   geoLegalAddress: { latitude: number, longitude: number };
    empresaPAISLEGAL: string;
    
    empresaDIRECCION: string;               //   operativeAddress: string;
    empresaLONGITUD: string;                //   geoOperativeAddress: { latitude: number, longitude: number };              
    empresaLATITUD: string;                 //   geoOperativeAddress: { latitude: number, longitude: number };
    empresaDIRECCIONIGUAL: string;         //    checkAddress?: false;    
    empresaDESCUENTOCASHBACK: string;      //    rewardEtix?: number;
    empresaGANANCIAETIX: string; 
    empresaPAIS: string;
   

    empresaNOMBREMAP: string;               //    brandName: string;
    empresaDESCRIPCION: string;             //    companyDescription: string;
    empresaFOTO: File;                      //    previewPhoto?: File;
    empresaFOTOPRINCIPALRECTANGULAR: File;  //    coverPhoto?: File;
    empresaFOTOPRINCIPALCUADRADA: File;     //    smallPhoto?: File;
    empresasImagenes?: any;
   
    empresaREFERENCIACOMERCIAL: string;

    constructor() {
      this.empresaTIENDAONLINE = '';            //  isRepresentativeLegal: string;
      this.empresaCATEGORIA = '';               //  idCategory: string
      this.empresaPAGINAWEB = '';               //  linkWebSide?: string;

      // Contacto
      this.empresaEMAIL = '';                   //   email: string;
      this.empresaTELEFONO = '';                //   codeCountry: number + phone: string;

      // Informacion fiscal
      this.empresaNOMBRE = '';                  //   companyName: string;
      //   idlegalRepresentative: number;
      this.empresaREPRESENTANTELEGAL = '';      //   legalRepresentative: string;
      this.empresaNIT = '';                     //   taxNumber: string;
      this.empresaNOMBRELEGAL = '';             //   legalForm: number;                      
      this.empresaDIRECCIONLEGAL = '';          //   legalAddress: string;
      //operativeAddress: string;
      this.empresaLONGITUD = '';                //   geoLegalAddress: { latitude: number, longitude: number };
      this.empresaLATITUD = '';                 //   geoLegalAddress: { latitude: number, longitude: number };
      // geoOperativeAddress: {
      //   latitude: number,
      //   longitude: number
      // };
      this.empresaDIRECCIONIGUAL = '';         //    checkAddress?: false;                     
      this.empresaDESCUENTOCASHBACK = '';      //    rewardEtix?: number;
      // suggestedReward?: number;

      this.empresaNOMBREMAP = '';               //    brandName: string;
      this.empresaDESCRIPCION = '';             //    companyDescription: string;
      this.empresaFOTO =  null;                      //    previewPhoto?: File;
      this.empresaFOTOPRINCIPALRECTANGULAR = null;  //    coverPhoto?: File;
      this.empresaFOTOPRINCIPALCUADRADA = null;     //    smallPhoto?: File;
      this.empresasImagenes = []
      this.empresaREFERENCIACOMERCIAL = '';
      this.companyRepresentative = null;
    }
}


