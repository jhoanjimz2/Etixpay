export class ResponseCategoriesMarketplace {
  message: string;
  data: CategoriesMarkeplace[];
}

export class CategoriesMarkeplace {
  categoryNAME: string;
  categoryCODE: string;
  categoryDESCIPTION: string;
  created_at: string;
  updated_at: string;
  uuid: string;

  constructor() {
    this.categoryNAME = '';
    this.categoryCODE = '';
    this.categoryDESCIPTION = '';
    this.created_at = '';
    this.updated_at = '';
    this.uuid = '';
  }
}