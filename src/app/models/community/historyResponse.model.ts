export class HistoryResponse {
  success: boolean;
  data: Data;
  message: string;
}

interface Data {
  current_page: number;
  data: DataHistory[];
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

export class DataHistory {
  id: number;
  punto_recompensaVOLUMEN: string;
  punto_recompensaVOLUMENRED: string;
  punto_recompensaGANANCIA: string;
  punto_recompensa_periodoID: number;
  punto_recompensa_nivelID: number;
  created_at: string;
  updated_at: string;
  punto_recompensaAFILIADOS: number;
  transaccionID?: number;
  network_father_count: number;
  network_son_count: number;
  period: Period;
  transaction: Transaction;
}

interface Period {
  id: number;
  punto_recompensa_periodoFECHAINICIO: string;
  punto_recompensa_periodoFECHAFINAL: string;
  punto_recompensa_periodoVOLUMENGENERAL: string;
  punto_recompensa_periodoVOLUMENETIX: string;
  punto_recompensa_periodoVOLUMENAYUDAS: string;
  punto_recompensa_periodoVOLUMENSORTEO: string;
  created_at: string;
  updated_at: string;
  month: string;
}

interface Transaction {
  proyectoID: number,
  proyectoCANTIDADTOK: string,
  proyectoCANTIDADATM: string,
  transaccionOBSERVACIONES: string,
  transaccionEMPRESA: any,
  uuid: string,
  proyecto: Proyecto;
  empresa: any
}

interface Proyecto {
  id: number;
  proyectoNOMBRE: string;
  uuid: string;
  link: string
}