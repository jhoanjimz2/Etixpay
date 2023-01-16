
export class Profesional {
    id:                            number;
    profesionalADDRESS:            string;
    profesionalWEB:                string;
    profesionalDESRIPTION:         string;
    profesionalisSERVICEVIRTUAL:   number;
    profesionalPHONE:              string;
    profesionalALTERPHONE:         string;
    profesionalCOMMISSION:         number;
    profeionalSUGGESTEDCOMMISSION: number;
    profesionalNAMEMAP:            string;
    userID:                        number;
    countryID:                     string;
    cityID:                        number;
    created_at:                    Date;
    updated_at:                    Date;
    deleted_at:                    Date;
    stateID:                       number;
    uuid:                          string;
    main_image:                    string;
    reward_point:                  number;
    rating:                        number;
    gallery:                       string[];
    proffesion_professional:       ProffesionProfessional[];
    professions_data:              ProffesionProfessional2[];
    rectangular_image:             string;
    square_image:                  string;
    email_user:                    string;
    legal_address:                 Address;
    operative_address:             Address;
    legal_form_id:                 number;
    profesionalREPRESENTATIVENAME: string;
    profesionalTAXNUMBER:          string;

    constructor() {
        this.id = 0;
        this.profesionalADDRESS = '';
        this.profesionalWEB = '';
        this.profesionalDESRIPTION = '';
        this.profesionalisSERVICEVIRTUAL = 0;
        this.profesionalPHONE = '';
        this.profesionalALTERPHONE = '';
        this.profesionalCOMMISSION = 0;
        this.profeionalSUGGESTEDCOMMISSION = 0;
        this.profesionalNAMEMAP = '';
        this.userID = 0;
        this.countryID = '';
        this.cityID = 0;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.deleted_at = new Date();
        this.stateID = 0;
        this.uuid = '';
        this.main_image = '';
        this.reward_point = 0;
        this.rating = 0;
        this.gallery = [];
        this.proffesion_professional = [ {} as ProffesionProfessional ];
        this.professions_data = [ {} as ProffesionProfessional2 ];
        this.rectangular_image = '';
        this.square_image = '';
        this.email_user = '';
        this.legal_address = new Address();
        this.operative_address = new Address();
        this.legal_form_id = 0;
        this.profesionalREPRESENTATIVENAME = '';
        this.profesionalTAXNUMBER = '';
    }
}

export class ProffesionProfessional {
    profession: string;
    services:   string[];
    constructor() {
        this.profession = '';
        this.services = [];
    }
}
export class ProffesionProfessional2 {
    id: string;
    services:   ids[];
    constructor() {
        this.id = '';
        this.services = [ {} as ids ];
    }
}
export class ids {
    id: string;
    constructor() {
        this.id = ''
    }
}
export class Address {
    address: string;
    latitud: string;
    longitud: string;
    constructor() {
        this.address = '';
        this.latitud = '';
        this.longitud = '';
    }
}


