export class EditProfesional {
    proffesions: Proffesions[];
    legal_form_id: number;
    profesionalREPRESENTATIVENAME: string;
    profesionalTAXNUMBER: string;
    legalAddress : Address;
    isLegalEqualsOperativeAddress: number;
    operativeAddress: Address;
    profesionalNAMEMAP: string;
    profesionalDESRIPTION: string;
    profesionalEMAIL: string;
    country_id: string;
    profesionalPHONE: string;
    profesionalWEB: string;
    constructor() {
        this.proffesions = [ {} as Proffesions ];
        this.legal_form_id = 0;
        this.profesionalREPRESENTATIVENAME = '';
        this.profesionalTAXNUMBER = '';
        this.legalAddress = {} as Address;
        this.isLegalEqualsOperativeAddress = 0;
        this.operativeAddress = {} as Address;
        this.profesionalNAMEMAP = '';
        this.profesionalDESRIPTION = '';
        this.profesionalEMAIL = '';
        this.country_id = '';
        this.profesionalPHONE = '';
        this.profesionalWEB = '';
    }
}

export class Proffesions {
    proffesionID: string;
    services:   string[];
    constructor() {
        this.proffesionID = '';
        this.services = [];
    }
}
export class Address {
    addressMAIN: string;
    addressLATITUD: string;
    addressLONGITUD: string;
    constructor() {
        this.addressMAIN = '';
        this.addressLATITUD = '';
        this.addressLONGITUD = '';
    }
}


