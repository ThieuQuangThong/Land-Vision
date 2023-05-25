import { ImageModel } from './image-model';
import { PositionModel } from './position-model';
export class PositonPostModel {
  id: number =0;
  userId: number = 0;
  title: string = '';
  approveStatus: number = 0;
  area: string = '';
  addressNumber: string = '';
  images: ImageModel[] = [];
  avatarLink: string = '';
  price: number = 0;
  name: string = '';
  positions: PositionModel[] =[]
}
