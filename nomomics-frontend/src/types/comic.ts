export interface Comic {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  fileUrl: string;
  synopsis: string;
  description: string;
  createdAt: string;
  episodes: {
    episodeNumber: number;
    episodeTitle: string;
    // episodeDescription: string;
    episodeFileUrl: string[];
    episodeCoverImage: string;
    dateUploaded: string;
    filesType: string;
  }[];
  category: string;
  genre: string;
  location: string;
  // Add other comic properties here
}

export interface ComicsContextProps {
  comics: Comic[];
  addComic: (comic: Comic) => void;
  removeComic: (id: string) => void;
  getComics: () => void;
  getComic: (id: string) => void;
  loadingComic: boolean;
  comic: Comic | null;

  // MarketPlace Comics
  marketPlaceComics: MarketPlaceComic[];
  getMarketPlaceComics: () => void;
  getMarketPlaceComic: (id: string) => void;
  loadingMarketPlaceComic: boolean;
  marketPlaceComic: MarketPlaceComic | null;
}

export interface MarketPlaceComic {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  fileUrl: string;
  synopsis: string;
  description: string;
  createdAt: string;
  episodes: {
    episodeNumber: number;
    episodeTitle: string;
    // episodeDescription: string;
    episodeFileUrl: string[];
    episodeCoverImage: string;
    dateUploaded: string;
    filesType: string;
  }[];
  category: string;
  genre: string;
  location: string;
  // Add other comic properties here
  price: number;
  owner: {
    profileImage: string;
    fullName: string;
    nickName: string;
  };
}
