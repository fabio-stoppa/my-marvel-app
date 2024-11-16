export interface Series {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: {
    type: string;
    url: string;
  }[];
  startYear: number;
  endYear: number;
  rating: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      type: string;
    }[];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  characters: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      role?: string;
    }[];
  };
  creators: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      role: string;
    }[];
  };
  next?: {
    resourceURI: string;
    name: string;
  };
  previous?: {
    resourceURI: string;
    name: string;
  };
}

export interface SeriesResponse {
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
    results: Series[];
  };
  etag: string;
}
