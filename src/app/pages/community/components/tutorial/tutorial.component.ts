import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/models/community/youtube.models';
import { YoutubeService } from 'src/app/services/youtube.service';
import { CargandoService } from 'src/app/services/cargando.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {

  nroTutorial = 1;
  modal = true;
  @Output ('setModalInfoDev') setModalInfoDev: EventEmitter<boolean> = new EventEmitter<boolean>();
  videos: Video[] = [];
  search = '';
  placeholderSearch = ''

  constructor(
    private youtubeService: YoutubeService,
    private cargandoService: CargandoService,
    private translate: TranslateService
  ) {
    this.translate.get('SEARCHTUTORIAL').subscribe(value => {
      this.placeholderSearch = value;
    });
   }

  ngOnInit() {
    this.lodadVideos();
  }

  tutorial(nro: number) {
    this.nroTutorial = nro;
    this.showModal();
  }

  showModal() {
    this.setModalInfoDev.emit(true);
  }

  lodadVideos() {
    this.cargandoService.iniciaCargando();
    this.youtubeService.getVideos().subscribe(
      (response) => {
        this.videos.push(...response);
        this.cargandoService.terminaCargando();
      },
      () => this.cargandoService.terminaCargando()
    );
  }

  showVideo(video: Video) {
    const url = `https://www.youtube.com/embed/${video.resourceId.videoId}` 
    window.open(url);
  }

}
