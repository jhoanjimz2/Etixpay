export class ResponseProducts {
  message: string;
  data: DataResponseProducts;
}

interface DataResponseProducts {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export class Product {
  productNAME: string;
  productSKU: string;
  productSLUG: string;
  productSHORTDESCRIPTION: string;
  productDESCRIPTION: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  product_state_id: number;
  country_id: number;
  city_id: number;
  productADDRESS: string;
  productCOMMISSION: number;
  uuid: string;
  current_price: Currentprice;
  main_image: Mainimage;
  category_data: Categorydata;
  commission_community: boolean;
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
    this.country_id = 0;
    this.city_id = 0;
    this.productADDRESS = '';
    this.productCOMMISSION = 0;
    this.uuid = '';
    this.current_price = {} as Currentprice;
    this.main_image = {} as Mainimage;
    this.category_data = {} as Categorydata;
    this.commission_community =  false;
    this.reward_point = 0;
  }
}

interface Categorydata {
  categoryNAME: string;
  uuid: string;
}

interface Mainimage {
  created_at: string;
  updated_at: string;
  uuid: string;
  file: File;
}

interface File {
  fileURL: string;
  fileNAME: string;
  fileEXT: string;
  created_at: string;
  updated_at: string;
  uuid: string;
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