export class QuantityByTime {
  numbByDays?: { [key: string]: number };
  numbByMonths?: { [key: string]: number };
  numbByYears?: { [key: string]: number };
}

export class DetailPurchaseQuantityByType {
  name : string = '';
  value : number = 0;
}
export class PostQuantityByType {
  key: number=0;
  value : number=0
}
