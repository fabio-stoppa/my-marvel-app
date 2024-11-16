export interface Event {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: {
    type: string;
    url: string;
  }[];
  modified: string;
  start: string;
  end: string;
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
  series: {
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

export interface EventResponse {
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
    results: Event[];
  };
  etag: string;
}
