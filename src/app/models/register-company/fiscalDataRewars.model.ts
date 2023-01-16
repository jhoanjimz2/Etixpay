export class FiscalDataReward {
    companyName: string;
    idlegalRepresentative: number;
    legalRepresentative: string;
    idRepresentative: number;
    taxNumber: string;
    legalForm: number;
    legalFormCode: string;
    legalAddress: string;
    legalCountry: string;
    legalCity: string;
    operativeAddress: string;
    operativeCountry: string;
    operativeCity: string;
    geoLegalAddress: {
      latitude: number,
      longitude: number
    };
    geoOperativeAddress: {
      latitude: number,
      longitude: number
    };
    checkAddress?: false;
    linkWebSide?: string
    rewardEtix?: number;
    suggestedReward?: number;
   
    constructor() {
        this.companyName = '';
        this.idlegalRepresentative = 0;
        this.legalRepresentative = '';
        this.idRepresentative = null;
        this.taxNumber = '';
        this.legalForm = 0;
        this.legalFormCode = '';
        this.legalAddress = '';
        this.operativeAddress = '';
        this.geoLegalAddress = {
          latitude: 0,
          longitude: 0
        };
        this.geoOperativeAddress = {
          latitude: 0,
          longitude: 0
        };
        this.checkAddress = false;
        this.linkWebSide = '';
        this.rewardEtix = 0;
        this.suggestedReward = 0;
      }
}

