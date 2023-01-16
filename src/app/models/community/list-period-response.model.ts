export class  ResponseListPeriod {
  success: boolean;
  data: ListPeriod[];
  message: string;
}

export class ListPeriod {
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