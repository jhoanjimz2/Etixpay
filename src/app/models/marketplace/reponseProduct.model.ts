export class ResponseProductDetail {
  message: string;
  data: ProductDetail;
}

export class ProductDetail {
  productNAME: string;
  productSKU: string;
  productSLUG: string;
  productSHORTDESCRIPTION: string;
  productDESCRIPTION: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  product_state_id: number;
  country_id: string;
  city_id: string;
  productADDRESS: string;
  productCOMMISSION: number;
  uuid: string;
  current_price: Currentprice;
  main_image: Mainimage;
  category_data: Categorydata;
  commission_community: boolean;
  main_attributes: Mainattribute2[];
  gallery: Mainimage[];
  shipping_method_data: Shippingmethoddatum[];
  user_data: User;
  city: City;
  reward_point: number;
  

  constructor() {
    this.productNAME = '';
    this.productSKU = '';
    this.productSLUG = '';
    this.productSHORTDESCRIPTION = '';
    this.productDESCRIPTION = '';
    this.created_at = '';
    this.updated_at = '';
    this.category_id = 0;
    this.product_state_id = 0;
    this.city_id = '';
    this.country_id = '';
    this.productADDRESS = '';
    this.productCOMMISSION = 0;
    this.uuid = '';
    this.current_price = {} as Currentprice;
    this.main_image = {} as Mainimage;
    this.category_data = {} as Categorydata;
    this.city = {} as City;
    this.commission_community = false;
    this.main_attributes = [];
    this.gallery = [];
    this.shipping_method_data = [];
    this.user_data = {} as User;
    this.reward_point = 0;
  }
}

interface City {
  ciudadNOMBRE: string;
  pais: Pais;
}
interface Pais {
  paisNOMBRE: string;
}

interface Shippingmethoddatum {
  created_at: string;
  updated_at: string;
  uuid: string;
  data_shipping_mehtod: Datashippingmehtod;
  current_price: Currentprice2;
}

interface Currentprice2 {
  priceVALUE: number;
  pricePROMOTIONALE: number;
  priceDATEINIT?: any;
  priceDATEEND?: any;
  created_at: string;
  updated_at: string;
  uuid: string;
  pivot: Pivot2;
}

interface Pivot2 {
  product_shipping_method_id: number;
  price_id: number;
}

interface Datashippingmehtod {
  shipping_methodNAME: string;
  shipping_methodCODE: string;
  shipping_methodDESCRIPTION: string;
  created_at: string;
  updated_at: string;
  uuid: string;
}

interface Mainattribute2 {
  main_attributeINPUT: number;
  created_at: string;
  updated_at: string;
  uuid: string;
  main_attribute_name: string;
  main_attribute_code: string;
  mainattributes: Mainattribute[];
  attribute: Attribute;
}

interface Mainattribute {
  main_attributeINPUT: number;
  created_at: string;
  updated_at: string;
  uuid: string;
  main_attribute_name: string;
  main_attribute_code: string;
  product_attributes: Productattribute[];
  attribute: Attribute;
}

interface Attribute {
  attributeNAME: string;
  attributeCODE: string;
  attributeDESCIPTION: string;
  created_at: string;
  updated_at: string;
  uuid: string;
}

interface Productattribute {
  main_product_attributeVALUE: string;
  created_at: string;
  updated_at: string;
  uuid: string;
}

interface Categorydata {
  categoryNAME: string;
  uuid: string;
}

class Mainimage {
  created_at: string;
  updated_at: string;
  uuid: string;
  file?: File;

  constructor() {
    this.created_at = '';
    this.updated_at = '';
    this.uuid = '';
    // this.file = {} as File;
  }
}

class File {
  fileURL: string;
  fileNAME: string;
  fileEXT: string;
  created_at: string;
  updated_at: string;
  uuid: string;

  constructor() {
    this.fileURL = '';
    this.fileNAME = '';
    this.fileEXT = '';
    this.created_at = '';
    this.updated_at = '';
    this.uuid = '';
  }
}

interface Currentprice {
  priceVALUE: number;
  priceDATEINIT?: any;
  priceDATEEND?: any;
  uuid: string;
  pivot: Pivot;
}

interface Pivot {
  product_id: number;
  price_id: number;
}

interface User {
  uuid: number;
}