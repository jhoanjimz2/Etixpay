export class ListMyLevelResponse {
  success: boolean;
  data: Data;
  message: string;
}

class Data {
  levels: ListMyLevel[];
  myLevel: ListMyLevel;
  singNextLevel: number;
}

export class ListMyLevel {
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