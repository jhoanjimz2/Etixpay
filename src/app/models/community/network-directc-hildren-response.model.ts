export class NetworkDirectResponse {
  success: boolean;
  data: Data;
  message: string;
}

class Data {
  me: Me;
  network?: Network[];

  constructor() {   
    this.me = {} as Me; 
  }
}

interface Network {
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
  network_son: Networkson;
  network_father?: Networkson;
  user: User2;
}

interface User2 {
  id: number;
  email: string;
  usuarioNUMEROAFILIADO: number;
  fechaRegistro: string;
  usuarioAFILIADO: number;
  direct_friends_count: number;
  uuid: string;
  main_uuid: string;
  persona: PersonaPerfil;
  empresa?: any;
}

export class PersonaPerfil {
  personaNOMBRES?: string;
  personaAPELLIDOS?: string;
  personaFOTO?: string;
  persona_indicativo_telefono?: any;
}

interface Networkson {
  id: number;
  punto_recompensa_redDIFERENCIAPORCENTAJE: string;
  punto_recompensa_redGANACIA: string;
  punto_recompensa_redPADRE: number;
  punto_recompensa_redHIJO: number;
  created_at: string;
  updated_at: string;
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

class Me {
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
  user: User;

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
    this.network_father_count = 0;
    this.network_son_count = 0;
    this.level = {} as Level;
    this.user = {} as User;
  }
}

interface User {
  id: number;
  email: string;
  usuarioNUMEROAFILIADO: number;
  fechaRegistro: string;
  usuarioAFILIADO?: any;
  direct_friends_count: number;
  uuid: string;
  main_uuid: string;
  persona: Persona;
  empresa?: any;
}

interface Persona {
  personaNOMBRES: string;
  personaAPELLIDOS: string;
  personaFOTO: string;
  persona_indicativo_telefono?: any;
}

interface Level {
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