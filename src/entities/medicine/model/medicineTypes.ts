export type StockEntry = {
  warehouse_id: string;
  quantity: string;
  expiry_date: string;
};

export type FormValues = {
  name: string;
  category_id: string;
  price: string;
  note: string;
  is_imported: boolean;
  is_active: boolean;
  is_alternative: boolean;
  stocks: StockEntry[];
};

export type ImageFile = {
  id: string;
  file: File;
  preview: string;
};
