export class TiendaInfo {
    cashbackCLIENTE?;
    ciudad?: {
        ciudadNOMBRE?: string
        id?: number
    }
    comisionWALLET?: string
    empresaCATEGORIA?: string;
    empresaCIUDAD?: number;
    empresaDIRECCION?: string;
    empresaEMAIL?: string;
    empresaLATITUD?: string;
    empresaLONGITUD?;
    empresaNOMBREMAP?: string;
    empresaPAIS?: string;
    empresa_indicativo_telefono?: string;
    empresaTELEFONO?: string;
    pais?: {
        paisNOMBRE?: string
        id?: number
    }
    pr_base?: number;
    userEMAIL?: string;
    uuid?: string;
    user?: {
        main_uuid: string
    }
    

    constructor() {
        this.cashbackCLIENTE = "";
        this.ciudad = {
            ciudadNOMBRE: "",
            id: 0
        };
        this.comisionWALLET = "";
        this.empresaCATEGORIA = "";
        this.empresaCIUDAD = 0;
        this.empresaDIRECCION = "";
        this.empresaEMAIL = "";
        this.empresaLATITUD = "";
        this.empresaLONGITUD = "";
        this.empresaNOMBREMAP = "";
        this.empresaPAIS = "";
        this.empresaTELEFONO = "";
        this.empresa_indicativo_telefono = "";
        this.pais = {
            paisNOMBRE: "",
            id: 0
        };;
        this.pr_base = 0;
        this.userEMAIL = "";
        this.uuid = "";
    }
}