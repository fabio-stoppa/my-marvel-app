// src/types/marvel.ts

export interface Url {
  type: string;
  url: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ComicItem {
  resourceURI: string;
  name: string;
}

export interface StoriesItem {
  resourceURI: string;
  name: string;
  type: string;
}

export interface EventItem {
  resourceURI: string;
  name: string;
}

export interface SeriesItem {
  resourceURI: string;
  name: string;
}

export interface Comics {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicItem[];
}

export interface Stories {
  available: number;
  returned: number;
  collectionURI: string;
  items: StoriesItem[];
}

export interface Events {
  available: number;
  returned: number;
  collectionURI: string;
  items: EventItem[];
}

export interface Series {
  available: number;
  returned: number;
  collectionURI: string;
  items: SeriesItem[];
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  series: Series;
}

export interface MarvelResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
  };
  etag?: string;
}
