export interface ResponseSendSMS {
  success: boolean;
  data: Data;
  message: string;
}

interface Data {
  empresaCODIGO: string;
  updated_at: string;
  created_at: string;
}