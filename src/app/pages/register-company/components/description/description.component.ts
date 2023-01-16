import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Description } from 'src/app/models/register-company/description.model';
import { CamaraService } from 'src/app/services/camara.service';
import { Plugins, CameraResultType } from'@capacitor/core';
const  { Camera } = Plugins;


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {


  @Input ('description') description: Description = new Description();
  @Input ('stepNumber') stepNumber = 0;
  @Input ('fromSummary') fromSummary = false;
  @Output('nextStepNumber') nextStepNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output('setDescription') setDescription: EventEmitter<Description> = new EventEmitter<Description>();
  fgAction = false;
  previewPhoto: string;
  coverPhoto: string;
  smallPhoto: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string

  constructor(
    private actionSheetController: ActionSheetController,
    private camaraService: CamaraService
  ) { }

  ngOnInit() {}

  continue() {
    if (this.fromSummary) {
      this.nextStepNumber.emit(5);
    } else {
      let stepNumber = this.stepNumber + 1;
      if (stepNumber > 5) {
        stepNumber = 5;
      }
      this.nextStepNumber.emit(stepNumber);
    }
    this.setDescription.emit(this.description);
  }
  async photo(photoNumber: number) {
    this.fgAction = false;
    const camara = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    const base64Image = camara.dataUrl;
    const file: any = this.camaraService.dataURItoBlob(base64Image);
    let name = '';
    if (base64Image) {
      switch (photoNumber) {
        case 1:
          this.previewPhoto = base64Image;
          this.description.previewPhotoStr = base64Image;
          name = 'previewPhoto';

          break;
        case 2:
          this.coverPhoto = base64Image;
          this.description.coverPhotoStr = base64Image;
          name = 'coverPhoto';
          break;
        case 3:
          this.smallPhoto = base64Image;
          this.description.smallPhotoStr = base64Image;
          name = 'smallPhoto';
          break;
        case 4:
          this.photo1 = base64Image;
          this.description.photosProfile.photo1Str = base64Image;
          name = 'photo1';
          break;
        case 5:
          this.photo2 = base64Image;
          this.description.photosProfile.photo2Str = base64Image;
          name = 'photo2';
          break;
        case 6:
          this.photo3 = base64Image;
          this.description.photosProfile.photo3Str = base64Image;
          name = 'photo3';
          break;
        case 7:
          this.photo4 = base64Image;
          this.description.photosProfile.photo4Str = base64Image;
          name = 'photo4';
          break;
        case 8:
          this.photo5 = base64Image;
          this.description.photosProfile.photo5Str = base64Image;
          name = 'photo5';
          break;
      }
      file.name = name;
      this.selectImage(file, photoNumber);
    } else {
      this.selectImage(null, photoNumber);
    }
  }

  selectImage(file: File, photoNumber: number) {
    if (!file) {
      switch (photoNumber) {
        case 1:
          this.previewPhoto = null;
          this.description.previewPhotoStr = null;
          this.description.previewPhoto = null;
          break;
        case 2:
          this.coverPhoto = null;
          this.description.coverPhotoStr = null;
          this.description.coverPhoto = null;
          break;
        case 3:
          this.smallPhoto = null;
          this.description.smallPhotoStr = null;
          this.description.smallPhoto = null;
          break;
        case 4:
          this.photo1 = null;
          this.description.photosProfile.photo1Str = null;
          this.description.photosProfile.photo1 = null;
          break;
        case 5:
          this.photo2 = null;
          this.description.photosProfile.photo2Str = null;
          this.description.photosProfile.photo2 = null;
          break;
        case 6:
          this.photo3 = null;
          this.description.photosProfile.photo3Str = null;
          this.description.photosProfile.photo3 = null;
          break;
        case 7:
          this.photo4 = null;
          this.description.photosProfile.photo4Str = null;
          this.description.photosProfile.photo4 = null;
          break;
        case 8:
          this.photo5 = null;
          this.description.photosProfile.photo5Str = null;
          this.description.photosProfile.photo5 = null;
          break;  
      }  
    } else {
      if (file.type.indexOf('image') < 0) {
        switch (photoNumber) {
          case 1:
            this.previewPhoto = null;
            break;
          case 2:
            this.coverPhoto = null;
            break;
          case 3:
            this.smallPhoto = null;
            break;
          case 4:
            this.photo1 = null;
            break;
          case 5:
            this.photo2 = null;
            break;
          case 6:
            this.photo3 = null;
            break;
          case 7:
            this.photo4 = null;
            break;
          case 8:
            this.photo5 = null;
            break; 
        }
      }
      switch (photoNumber) {
        case 1:
          this.description.previewPhoto = file;
          break;
        case 2:
          this.description.coverPhoto = file;
          break;
        case 3:
          this.description.smallPhoto = file;
          break;
        case 4:
          this.description.photosProfile.photo1 = file;
          break;
        case 5:
          this.description.photosProfile.photo2 = file;
          break;
        case 6:
          this.description.photosProfile.photo3 = file;
          break;
        case 7:
          this.description.photosProfile.photo4 = file;
          break;
        case 8:
          this.description.photosProfile.photo5 = file;
          break;
      }
    }
  }

}
