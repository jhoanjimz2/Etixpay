export class CommunityMainRespose {
  success: boolean;
  data: DataCommunityMain;
  message: string;

  constructor() {
    this.success = false;
    this.data = {} as DataCommunityMain;
    this.message = '';
  }
}

export class DataCommunityMain {
  id: number;
  punto_recompensaVOLUMEN: string;
  punto_recompensaVOLUMENRED: string;
  punto_recompensaGANANCIA: string;
  punto_recompensa_periodoID: number;
  punto_recompensa_nivelID: number;
  network_son_count: number;
  network_father_count: number;
  created_at: string;
  updated_at: string;
  punto_recompensaAFILIADOS: number;
  transaccionID?: any;
  level: LevelCommunityMain;
  period: PeriodCommunityMain;
  user: UserMainCommunity;
  cantidadAmigos: number;
  cantidadAmigosRed: number;
  
  constructor() {
    this.id = 0;
    this.punto_recompensaVOLUMEN = '';
    this.punto_recompensaVOLUMENRED = '';
    this.punto_recompensaGANANCIA = '';
    this.punto_recompensa_periodoID = 0;
    this.punto_recompensa_nivelID = 0;
    this.created_at = '';
    this.updated_at = '';
    this.punto_recompensaAFILIADOS = 0;
    this.level = {} as LevelCommunityMain;
    this.period = {} as PeriodCommunityMain;
    this.user = {} as UserMainCommunity;
    this.cantidadAmigos = 0;
    this.cantidadAmigosRed = 0;
  }
}

export class PeriodCommunityMain {
  id: number;
  punto_recompensa_periodoFECHAINICIO: string;
  punto_recompensa_periodoFECHAFINAL: string;
  punto_recompensa_periodoVOLUMENGENERAL: string;
  punto_recompensa_periodoVOLUMENETIX: string;
  punto_recompensa_periodoVOLUMENAYUDAS: string;
  punto_recompensa_periodoVOLUMENSORTEO: string;
  created_at: string;
  updated_at: string;
}

export class LevelCommunityMain {
  id: number;
  punto_recompensa_nivelTITULO: string;
  punto_recompensa_nivelVOLUMENMIN: string;
  punto_recompensa_nivelVOLUMENMAX: string;
  punto_recompensa_nivelPORCENTAJE: string;
  created_at?: any;
  updated_at?: any;
  paisID: number;
  punto_recompensa_nivelMINPAGO: string;

  constructor() {
    this.id = 0;
    this.punto_recompensa_nivelTITULO = '';
    this.punto_recompensa_nivelVOLUMENMIN = '';
    this.punto_recompensa_nivelVOLUMENMAX = '';
    this.punto_recompensa_nivelPORCENTAJE = '';
    this.paisID = 0;
    this.punto_recompensa_nivelMINPAGO = '';
  }
}

export class UserMainCommunity {
  available_friends_count: number;
  id: number
  main_uuid: string;
  usuarioAFILIADO?: any
  uuid: string

  constructor() {
    this.available_friends_count = 0;
    this.id = 0;
    this.main_uuid = '';
    this.uuid = '';
  }
}