import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cupones'
})
export class CuponesPipe implements PipeTransform {
  transform(cupones: any[], ordenamiento = null, segment = null, tipos_vouchers = null): any[] {
    
    if (tipos_vouchers == "my") {
      if (!ordenamiento && !segment) return cupones;
      if (segment || ordenamiento) {
        if (ordenamiento == 1) {
        }
        if (ordenamiento == 2) {
          cupones.sort( function(a, b) {
            if (parseFloat(a.vouchers.voucherPRECIO) < parseFloat(b.vouchers.voucherPRECIO)) return -1;
            if (parseFloat(a.vouchers.voucherPRECIO) > parseFloat(b.vouchers.voucherPRECIO)) return 1;
          });
        }
        if (ordenamiento == 3) {
          cupones.sort( function(a, b) {
            if (parseFloat(a.vouchers.voucherPRECIO) > parseFloat(b.vouchers.voucherPRECIO)) return -1;
            if (parseFloat(a.vouchers.voucherPRECIO) < parseFloat(b.vouchers.voucherPRECIO)) return 1;
          });
        }
        if (ordenamiento == 4) {
          cupones.sort( function(a, b) {
            if (a.vouchers.voucherFECHACADUCIDAD < b.vouchers.voucherFECHACADUCIDAD) return -1;
            if (a.vouchers.voucherFECHACADUCIDAD > b.vouchers.voucherFECHACADUCIDAD) return 1;
          });
        }
        if (!segment) return cupones;
        return cupones.filter( cupon => {
          return cupon.vouchers.voucher_type.id.toString().indexOf(segment) > -1;
        });
      }
    }
    if (tipos_vouchers == null) {
      if (!ordenamiento && !segment) return cupones;
      if (segment || ordenamiento) {
        if (ordenamiento == 1) {
        }
        if (ordenamiento == 2) {
          cupones.sort( function(a, b) {
            if (parseFloat(a.voucherPRECIO) < parseFloat(b.voucherPRECIO)) return -1;
            if (parseFloat(a.voucherPRECIO) > parseFloat(b.voucherPRECIO)) return 1;
          });
        }
        if (ordenamiento == 3) {
          cupones.sort( function(a, b) {
            if (parseFloat(a.voucherPRECIO) > parseFloat(b.voucherPRECIO)) return -1;
            if (parseFloat(a.voucherPRECIO) < parseFloat(b.voucherPRECIO)) return 1;
          });
        }
        if (ordenamiento == 4) {
          cupones.sort( function(a, b) {
            if (a.voucherFECHACADUCIDAD < b.voucherFECHACADUCIDAD) return -1;
            if (a.voucherFECHACADUCIDAD > b.voucherFECHACADUCIDAD) return 1;
          });
        }
        if (!segment) return cupones;
        return cupones.filter( cupon => {
          return cupon.voucher_type.id.toString().indexOf(segment) > -1;
        });
      }
    }
  }

}
