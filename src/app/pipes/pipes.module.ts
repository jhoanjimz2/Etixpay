import { NgModule } from '@angular/core';
import { FormattNumberPipe } from './formatt-number.pipe';
import { DateTimeFormatFilterPipe } from './date-time-format-filter.pipe';
import { ColaboradoresPipe } from './colaboradores.pipe';
import { ContactosPipe } from './contactos.pipe';
import { FormattNumber2Pipe } from './formatt-number2.pipe';
import { TopTicketBackPipe } from './top-ticket-back.pipe';
import { AmigosPipe } from './amigos.pipe';
import { PaisPipe } from './pais.pipe';
import { CiudadPipe } from './ciudad.pipe';
import { Filtro1EventosPipe } from './filtro-1-eventos.pipe';
import { Filtro2EventosPipe } from './filtro-2-eventos.pipe';
import { ListaDeAmigosPipe } from './lista-de-amigos.pipe';
import { TiendasPipe } from './tiendas.pipe';
import { CuponesPipe } from './cupones.pipe';
import { MapaPipe } from './mapa.pipe';
import { InversionesPipe } from './inversiones.pipe';
import { CommunityPipe } from './community.pipe';
import { HistoryPipe } from './history.pipe';
import { MapaDosPipe } from './mapa-dos.pipe';
import { ModoIbanPipe } from './modo-iban.pipe';
import { numberFormatPipe } from './numberFormat.pipe';
import { VideosYoutube } from './youtube.pipe';
import { ProductsMarketplace } from './productsMarketplace.pipe';
import { ImagePipe } from './image.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ExpertsPipe } from './experts.pipe';



@NgModule({
  declarations: [
    FormattNumberPipe, 
    DateTimeFormatFilterPipe, 
    ColaboradoresPipe, 
    ContactosPipe, 
    FormattNumber2Pipe, 
    TopTicketBackPipe, 
    AmigosPipe, 
    PaisPipe, 
    CiudadPipe, 
    Filtro1EventosPipe, 
    Filtro2EventosPipe,
    ListaDeAmigosPipe,
    TiendasPipe,
    CuponesPipe,
    MapaPipe,
    InversionesPipe,
    CommunityPipe,
    HistoryPipe,
    MapaDosPipe,
    ModoIbanPipe,
    numberFormatPipe,
    VideosYoutube,
    ProductsMarketplace,
    ImagePipe,
    ImageSanitizerPipe,
    ExpertsPipe
  ],
  exports: [
    FormattNumberPipe,  
    DateTimeFormatFilterPipe, 
    ColaboradoresPipe, 
    ContactosPipe, 
    FormattNumber2Pipe, 
    TopTicketBackPipe, 
    AmigosPipe, 
    PaisPipe, 
    CiudadPipe, 
    Filtro1EventosPipe, 
    Filtro2EventosPipe,
    ListaDeAmigosPipe,
    TiendasPipe,
    CuponesPipe,
    MapaPipe,
    InversionesPipe,
    CommunityPipe,
    HistoryPipe,
    MapaDosPipe,
    ModoIbanPipe,
    numberFormatPipe,
    VideosYoutube,
    ProductsMarketplace,
    ImagePipe,
    ImageSanitizerPipe,
    ExpertsPipe
  ]
})
export class PipesModule { }
