export class ListByPeriodResponse {
  success: boolean;
  data: Data;
  message: string;
}

class Data {
  id: number;
  punto_recompensaVOLUMEN: string;
  punto_recompensaVOLUMENRED: string;
  punto_recompensaGANANCIA: string;
  punto_recompensa_periodoID: number;
  punto_recompensa_nivelID: number;
  created_at: string;
  updated_at: string;
  punto_recompensaAFILIADOS: number;
  transaccionID?: any;
  network_father_count: number;
  network_son_count: number;
  level: Level;
  period: Period;
}

class Period {
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

class Level {
  id: number;
  punto_recompensa_nivelTITULO: string;
  punto_recompensa_nivelVOLUMENMIN: string;
  punto_recompensa_nivelVOLUMENMAX: string;
  punto_recompensa_nivelPORCENTAJE: string;
  created_at?: any;
  updated_at?: any;
  paisID: number;
  punto_recompensa_nivelMINPAGO: string;
}