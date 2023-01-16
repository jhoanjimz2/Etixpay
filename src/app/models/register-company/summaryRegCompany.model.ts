import { Authorization } from "./authorization.model";
import { ContactDetail } from "./contactDetail.model";
import { Description } from "./description.model";
import { FiscalDataReward } from "./fiscalDataRewars.model";
import { ResponseSendSMS } from './responseSendSMS.model';

export class SummaryRegCompany {
    authorization: Authorization;
    contactDetail: ContactDetail;
    fiscalData: FiscalDataReward;
    description: Description;
    dataSMS: ResponseSendSMS;

    constructor () {
      this.authorization = new Authorization();
      this.contactDetail = new ContactDetail();
      this.fiscalData = new FiscalDataReward();
      this.description = new Description();
    }
}

