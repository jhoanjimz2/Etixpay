export class Description {
    brandName: string;
    companyDescription: string;
    previewPhoto?: File;
    previewPhotoStr?: string;
    coverPhoto?: File;
    coverPhotoStr?: string;
    smallPhoto?: File;
    smallPhotoStr?: string;
    photosProfile?: {
      photo1: File,
      photo1Str: string,
      photo2: File,
      photo2Str: string,
      photo3: File,
      photo3Str: string,
      photo4: File,
      photo4Str: string,
      photo5: File
      photo5Str: string
    }

    
    constructor() {
        this.brandName = '';
        this.companyDescription = '';
        this.previewPhoto = null;
        this.coverPhoto = null;
        this.smallPhoto = null;
        this.photosProfile = {
          photo1: null,
          photo2: null,
          photo3: null,
          photo4: null,
          photo5: null,
          photo1Str: '',
          photo2Str: '',
          photo3Str: '',
          photo4Str: '',
          photo5Str: ''
        }
      }
}

