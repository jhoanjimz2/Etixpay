export class EditProduct {
    attributes:              Attribute[];
    gallery:                 MainImage[];
    main_image:              MainImage;
    productNAME:             string;
    price:                   Price;
    product_type:            string;
    productSKU:              string;
    productSHORTDESCRIPTION: string;
    productDESCRIPTION:      string;
    category_uuid:           number;
    product_state_code:      string;
    hasCommunityCommission:  number;
    countryName:             string;
    cityName:                string;
    productADDRESS:          string;
    shipping_methods:        ShippingMethod[];
    user:                    User;
    constructor() {
        this.attributes = [];
        this.gallery = [];
        this.main_image = {} as MainImage;
        this.productNAME = '';
        this.price = {} as Price;
        this.product_type = '';
        this.productSKU = '';
        this.productSHORTDESCRIPTION = '';
        this.category_uuid  = 0;
        this.product_state_code = '';
        this.hasCommunityCommission = 0;
        this.countryName = '';
        this.cityName  = '';
        this.productADDRESS  = '';
        this.shipping_methods = [];
        this.user = {} as User;
    }
}

export interface Attribute {
    main_attribute_code: string;
    value:               string;
    uuid:                string;
}

export interface MainImage {
    uuid:        string;
    file_upload: File;
}

export interface Price {
    priceVALUE: number;
    uuid:       string;
}

export interface ShippingMethod {
    shipping_method_uuid: string;
    price:                Price;
}

export interface User {
    id:           number;
    name:         string;
    email:        string;
    sso_user_id:  string;
    main_user_id: string;
}
