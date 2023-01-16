export class ProductMarketPlace {
    title: string;
    category: string;
    description: string;
    price: number;
    community: number;
    image1: File;
    image2: File;
    image3: File;
    image4: File;
    imageStr1: string;
    imageStr2: string;
    imageStr3: string;
    imageStr4: string;
    city: any;
    address: string;
    country: any;
    directWithdraw: Boolean;
    shipping: Boolean;
    width: number;
    height: number;
    depth: number;
    weight: number;
    accepTerms: Boolean;
    infoConfor: Boolean;
    priceShipping: number;

    constructor() {
        this.title = '';
        this.category = '';
        this.description = '';
        this.price = null;
        this.community = 3;
        this.image1 = null;
        this.image2 = null;
        this.image3 = null;
        this.image4 = null;
        this.imageStr1 = '';
        this.imageStr2 = '';
        this.imageStr3 = '';
        this.imageStr4 = '';
        this.city = '';
        this.address = '';
        this.country = '';
        this.directWithdraw = false;
        this.shipping = false;
        this.width = null;
        this.height = null;
        this.depth = null;
        this.weight = null;
        this.accepTerms = false;
        this.infoConfor = false;
        this.priceShipping = 0;
    }
}