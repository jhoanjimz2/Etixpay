export class DataFiscal {
    legal_form_id:                 string;
    profesionalREPRESENTATIVENAME: string;
    isLegalEqualsOperativeAddress: number;
    profesionalTAXNUMBER:          string;
    operativeAddress:              Address; 
    legalAddress:                  Address; 
  
    constructor() {
      this.legal_form_id = '';
      this.profesionalREPRESENTATIVENAME = '';
      this.isLegalEqualsOperativeAddress = 0;
      this.profesionalTAXNUMBER = '';
      this.legalAddress = {
        addressLATITUD : '',
        addressLONGITUD: '',
        addressMAIN    : ''
      }
      this.operativeAddress = {
        addressLATITUD : '',
        addressLONGITUD: '',
        addressMAIN    : ''
      } 
    }
}
 
export interface Address {
    addressMAIN:     string;
    addressLONGITUD: string;
    addressLATITUD:  string;
}