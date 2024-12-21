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
		_id: string;
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

	//Home
	homeComic: Comic;
	setHomeComic: (homeComic: Comic) => void;
	comments: Comment[];
	setComments: (comments: Comment[]) => void;
}

export interface ComicsProviderProps {}

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
		_id: string;
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

export interface Comment {
	_id: string;
	comicId: string;
	episodeId: string;
	userId: {
		_id: string;
		fullName: string;
		profileImage: string;
		nickName: string;
	};
	replies: Comment[];
	content: string;
	parentCommentId: string | null;
	likes: {
		user: string;
		date: string;
		id: string;
	}[];
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
