export class PreRegistro {
  isRepresentative: number;
  profesionalisSERVICEVIRTUAL: number;
  profesionalWEB: string
  proffesions: Proffesions[];

  constructor() {
    this.isRepresentative = 1;
    this.profesionalisSERVICEVIRTUAL = 0;
    this.profesionalWEB = '';
    this.proffesions = [
      {
        proffesionID: '',
        services: []
      }
    ];
  }
}

export interface Proffesions {
  proffesionID: string;
  services:     string[];
}

