import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ValidacionServiceService {


  public email_pattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public alfanumerico_pattern = new RegExp(/[A-Za-z0-9]/);
  public numerico_pattern: string = "^[0-9]*$";

  constructor(
  ) { }

  validar_numeros_diferentes(campo_uno: string, campo_dos: string, campo_tres, campo_cuatro) {

    return ( form_group: AbstractControl): ValidationErrors | null => {

      const numero_uno = form_group.get(campo_uno)?.value;
      const numero_dos = form_group.get(campo_dos)?.value;
      const indicativo_uno = form_group.get(campo_tres)?.value;
      const indicativo_dos = form_group.get(campo_cuatro)?.value;
      if ((indicativo_uno.paisINDICATIVO + ''+ numero_uno) == (indicativo_dos.paisINDICATIVO + ''+ numero_dos)) {
        form_group.get(campo_dos)?.setErrors({ numero_invalido: true });
        return { numero_invalido: true };
      }
      form_group.get(campo_dos)?.setErrors(null);
      return null      
    }
    
  }
  
  validar_fechas(campo_uno: string, campo_dos: string, campo_tres: string) {

    return ( form_group: AbstractControl): ValidationErrors | null => {

      const fecha_inicial = form_group.get(campo_uno)?.value;
      const fecha_final = form_group.get(campo_dos)?.value;
      const fecha_final_compra = form_group.get(campo_tres)?.value;      
      const ahora = new Date();

      if (this.format_fecha_dos(ahora) >= this.format_fecha_dos(fecha_inicial)){
        form_group.get(campo_uno)?.setErrors({ fecha_invalida_final_compra: true });
        return { fecha_invalida_final_compra: true };
      } else form_group.get(campo_uno)?.setErrors(null);

      if (this.format_fecha(fecha_final) <= this.format_fecha(fecha_inicial)){
        form_group.get(campo_dos)?.setErrors({ fecha_invalida_final_compra: true });
        return { fecha_invalida_final_compra: true };
      } else form_group.get(campo_dos)?.setErrors(null);

      if (this.format_fecha(fecha_final_compra) >= this.format_fecha(fecha_final)){
        form_group.get(campo_tres)?.setErrors({ fecha_invalida_final_compra: true });
        return { fecha_invalida_final_compra: true };
      } else form_group.get(campo_tres)?.setErrors(null);

      return null      
    }
  }  

  validarDosFechasUno(campo_uno: string, campo_dos: string) {
    return ( form_group: AbstractControl): ValidationErrors | null => {
      const fecha_inicial = form_group.get(campo_uno)?.value;
      const fecha_final = form_group.get(campo_dos)?.value;   
      if (this.format_fecha_tres(fecha_final) <= this.format_fecha_tres(fecha_inicial)){
        form_group.get(campo_dos)?.setErrors({ horaFinal: true });
        return { horaFinal: true };
      } else form_group.get(campo_dos)?.setErrors(null);
      return null      
    }
  }
  validarDosFechasDos(campo_uno: string, campo_dos: string) {
    return ( form_group: AbstractControl): ValidationErrors | null => {
      const fecha_inicial = form_group.get(campo_uno)?.value;
      const fecha_final = form_group.get(campo_dos)?.value;   
      if (this.format_fecha_tres(fecha_final) <= this.format_fecha_tres(fecha_inicial)){
        form_group.get(campo_dos)?.setErrors({ horaFinalAM: true });
        return { horaFinalAM: true };
      } else form_group.get(campo_dos)?.setErrors(null);
      return null      
    }
  }
  validarDosFechasTres(campo_uno: string, campo_dos: string) {
    return ( form_group: AbstractControl): ValidationErrors | null => {
      const fecha_inicial = form_group.get(campo_uno)?.value;
      const fecha_final = form_group.get(campo_dos)?.value;   
      if (this.format_fecha_tres(fecha_final) <= this.format_fecha_tres(fecha_inicial)){
        form_group.get(campo_dos)?.setErrors({ horaFinalPM: true });
        return { horaFinalPM: true };
      } else form_group.get(campo_dos)?.setErrors(null);
      return null      
    }
  }


  format_fecha(fecha) {
    return moment(fecha).format('YYYY-MM-DD H:mm:ss');
  }
  format_fecha_dos(fecha) {
    return moment(fecha).format('YYYY-MM-DD');
  }
  format_fecha_tres(fecha) {
    return moment(fecha).format('HH:mm');
  }







  //-------------------------------FORMULARIO REGISTRO---------------------------------------//   

  validar_contraseñas_iguales(campo_uno: string, campo_dos: string) {
    return ( form_group: AbstractControl): ValidationErrors | null => {
      const contraeña = form_group.get(campo_uno)?.value;
      const confirmar_contraseña = form_group.get(campo_dos)?.value;
      const errors = form_group.get(campo_dos).errors;
      if (errors?.required) return { required: true };
      if (contraeña != confirmar_contraseña) {
        form_group.get(campo_dos)?.setErrors({ contrasenas_diferentes: true });
        return { contrasenas_diferentes: true };
      }
      form_group.get(campo_dos)?.setErrors(null);
      return null      
    }
  }
}
