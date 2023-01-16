export class CommunityNetworkRespose {
    success: boolean;
    data: DataCommunityNetwork[]
    message: string;
}

export class DataCommunityNetwork {
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
  network_son_count: number;
  network_father_count: number;
  level: LevelCommunityNetwork;
  period: PeriodCommunityNetwork;
  network_son?: any;
  network_father?: any;
  user: UserCommunityNetwork;
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
    this.network_son_count = 0;
    this.network_father_count = 0;
    this.level = {} as LevelCommunityNetwork;
    this.period = {} as PeriodCommunityNetwork;
    this.user = {} as UserCommunityNetwork;
    this.cantidadAmigos = 0;
    this.cantidadAmigosRed = 0;
  }
}

class UserCommunityNetwork {
  id: number;
  email: string;
  usuarioNUMEROAFILIADO: number;
  uuid: string;
  main_uuid: string;
  direct_friends_count: number;
  persona?: PersonaCommunityNetwork;
  empresa?: any;
}

class PersonaCommunityNetwork {
  personaNOMBRES?: any;
  personaAPELLIDOS?: any;
  personaFOTO?: any;
  persona_indicativo_telefono?: any;
}

class PeriodCommunityNetwork {
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

class LevelCommunityNetwork {
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