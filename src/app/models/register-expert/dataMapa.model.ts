export class DataMapa {
    mainImage:             any;
    rectangularImage:      any;
    squareImage:           any;
    gallery:               any[]; 
    profesionalDESRIPTION: string;
    profesionalNAMEMAP:    string;
  
    constructor() {
      this.mainImage = null;
      this.rectangularImage = null;
      this.squareImage = null;
      this.gallery = [null,null,null,null,null];
      this.profesionalDESRIPTION = '';
      this.profesionalNAMEMAP = '';
    }
}