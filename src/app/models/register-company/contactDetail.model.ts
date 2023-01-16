export class ContactDetail {
    email: string;
    phone: string;
    phoneFull: string;
    codeCountry: number;
    contryISO: string;
    codeCompany: string;
    code: {
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: '',
      digit5: '',
      digit6: ''
    };
    sendCode: boolean;
    verifiedCode:boolean;
    
    constructor() {
        this.email = '';
        this.phone = '';
        this.codeCountry = 0;
        this.codeCompany = '';
        this.code = {
          digit1: '',
          digit2: '',
          digit3: '',
          digit4: '',
          digit5: '',
          digit6: '',
        };
        this.sendCode = false;
        this.verifiedCode = false;
      }
}

