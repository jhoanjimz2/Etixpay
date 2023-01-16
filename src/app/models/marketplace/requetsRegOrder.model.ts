export class RequetsRegOrder {
    order_state_id: number;
    order_state_code: string;
    products: Product[];
    user_id: number

    constructor() {
        this.order_state_id = 1;
        this.order_state_code = 'pendiente';
        this.products = [];
        this.user_id = 0
      }
}

export class Product {
  product_uuid: string;
  product_orderPRICE: number;
  product_orderDISCOUNTPRICE: Number;
  product_orderAMOUNT: number;
  product_orderDELIVERYTIME: string;
  product_orderPRICESHIPPING: number;
  shipping_method_uuid: string;
  shipping_method_id: number;

  constructor() {
    this.product_uuid = '';
    this.product_orderPRICE = 0;
    this.product_orderDISCOUNTPRICE = 0;
    this.product_orderAMOUNT = 0;
    this.product_orderDELIVERYTIME = '';
    this.product_orderPRICESHIPPING = 0;
    this.shipping_method_uuid = '';
    this.shipping_method_id = 0
  }
}
