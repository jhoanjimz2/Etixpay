export class RequetsRegProduct {
    productNAME: string;
    productSKU: string;
    productSHORTDESCRIPTION: string;
    productDESCRIPTION: string;
    product_type: string;
    price: any;
    category_uuid: string;
    product_state_code: string;
    hasCommunityCommission: number;
    country_id: string;
    city_id: string;
    productADDRESS: string
    user: any;
    shipping_methods: any[];
    attributes: any[];
    gallery: any[];
    main_image: any;


    constructor() {
        this.productNAME = '';
        this.productNAME = '';
        this.productSKU = '';
        this.productSHORTDESCRIPTION = '';
        this.productDESCRIPTION = '';
        this.product_type = '';
        this.price = {priceVALUE: 0};
        this.category_uuid = '';
        this.product_state_code = '';
        this.hasCommunityCommission = 0;
        this.country_id = '';
        this.city_id = '';
        this.productADDRESS = ''
        this.user = {id: 0};
        this.shipping_methods = [{shipping_method_uuid: '', price: {priceVALUE: 0}}]
        this.attributes = [{main_attribute_code: 'height', value: 0}, {main_attribute_code: 'width', value: 0}, {main_attribute_code: 'depth', value: 0}, {main_attribute_code: 'weight', value: 0}];
        this.gallery = [{file_upload: ''}, {file_upload: ''}, {file_upload: ''}];
        this.main_image = {file_upload: ''};
      }
}

