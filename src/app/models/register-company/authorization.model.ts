export class Authorization {
    isRepresentativeLegal: string;
    typeStore: number;
    idCategory: string
    category: string;
    linkWebSide?: string;
    discountCategory?: number

    constructor() {
        this.isRepresentativeLegal = '';
        this.typeStore = 0;
        this.idCategory = '';
        this.category = '';
        this.linkWebSide = '';
        this.discountCategory = 0;
      }
}

