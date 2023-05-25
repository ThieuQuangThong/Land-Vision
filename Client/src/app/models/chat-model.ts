export class message {
  name : number = 0 ;
    type_response!: string;
    title?: string;
    response?: string;
    addresses?: {
      name_address: string;
      latitude: number;
      longitude: number;
    }[];

    values?: {
      url: string;
      name_post: string;
    }[]
}

