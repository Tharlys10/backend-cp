interface ICreateClientDTO {
  full_name: string;
  gender: 'masculine' | 'feminine';
  date_nasc: Date;
  age: number;
  city_id: string;
}

export { ICreateClientDTO };
