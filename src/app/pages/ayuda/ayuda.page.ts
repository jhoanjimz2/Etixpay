import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage {
  opciones = [
    {
      titulo: 'FAQS',
      icono: false,
      sub_opcion: [
        {
          titulo: 'WHATISETIXPAY',
          text: 'YOUETIXCOMUNIDAD'
        },
        {
          titulo: 'QUEESUNCIUDADANO',
          text: 'INCIUDADANOETICO'
        },
        {
          titulo: 'COMOCONVERTIRSE',
          text: 'DESCARGANDOLAAPLICACION'
        },
        {
          titulo: 'QUESONLOSPUNTOS',
          text: 'SONLAMONEDADELBOCAABOCA'
        },
        {
          titulo: 'CUALESSONLOSNIVELES',
          text: 'ENETIXHAY10NIVELES'
        },
        {
          titulo: 'QUEESLAGANANCIA',
          text: 'SITUCOMUNIDAD'
        },
        {
          titulo: 'COMOCREOUNACOMUNIDAD',
          text: 'HACIENDOLOQUESIEMPREHASHECHO'
        },
        {
          titulo: 'COMOSELLAMAESTAFORMADEINGRESO',
          text: 'ESTAESTRUCTURA'
        },
        {
          titulo: 'QUECAMBIACONETIX',
          text: 'PODRASEMPEZAR'
        },
        {
          titulo: 'QUESONLOSTIX',
          text: 'LOSTIXSON'
        },
        {
          titulo: 'ETIXPARTICIPA',
          text: 'UNAPARTEDELDINEO'
        },
        {
          titulo: 'CONQUIENCOMPARTIMOS',
          text: 'SIMPLENOLOSCOMPARTIMOS'
        },
        {
          titulo: 'CHATDECOMMUNITY',
          text: 'UTILIZAESTECHATENVIVO'
        }
      ]
    },
    {
      titulo: 'Contact',
      icono: true,
      sub_opcion: []
    }
  ]
}
