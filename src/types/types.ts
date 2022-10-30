import { PathOrFileDescriptor } from 'fs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface AlbumPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface UserFull {
  user: User;
  albums: Album[];
}

export interface AlbumFull {
  album: Album;
  user: User;
  photos: AlbumPhoto[];
}
