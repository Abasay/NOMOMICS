import {
	Comic,
	ComicsContextProps,
	Comment,
	MarketPlaceComic,
} from '@/types/comic';
import Cookies from 'js-cookie';
import { useParams, useSearchParams } from 'next/navigation';
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';

const ComicsContext = createContext<ComicsContextProps | undefined>(undefined);

export const useComics = () => {
	const context = useContext(ComicsContext);
	if (!context) {
		throw new Error(
			'useComics must be used within a ComicsProvider'
		);
	}
	return context;
};

interface ComicsProviderProps {
	children: ReactNode;
}

export const ComicsProvider: React.FC<ComicsProviderProps> = ({ children }) => {
	const { comicId } = useParams();

	const episodeNumber = useSearchParams().get('episode');

	useEffect(() => {
		if (comicId) {
			console.log(comicId);

			getComic(comicId as string);
		}
	}, [comicId, episodeNumber]);

	const [comics, setComics] = useState<Comic[]>([]);

	const [comic, setComic] = useState<Comic | null>(null);
	const [loadingComic, setLoadingComic] = useState(true);
	const [homeComic, setHomeComic] = useState<Comic>(null as any);
	const [comments, setComments] = useState<Comment[]>([]);

	const [marketPlaceComics, setMarketPlaceComics] = useState<
		MarketPlaceComic[]
	>([]);
	const [marketPlaceComic, setMarketPlaceComic] =
		useState<MarketPlaceComic | null>(null);
	const [loadingMarketPlaceComic, setLoadingMarketPlaceComic] =
		useState(true);

	const getMarketPlaceComics = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/comics/market-place`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get(
							'token'
						)}`,
					},
				}
			);

			const data = await res.json();
			setMarketPlaceComics(data.data.comics);
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingMarketPlaceComic(false);
		}
	};

	const getMarketPlaceComic = async (id: string) => {
		if (marketPlaceComics.length > 0) {
			setMarketPlaceComic(
				marketPlaceComics.find(
					(comic) => comic._id === id
				) || null
			);
			setLoadingMarketPlaceComic(false);
			return;
		}

		try {
			setLoadingMarketPlaceComic(true);
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/marketplace-comics/comic/${id}`
			);

			const data = await res.json();
			if (data.success) {
				setMarketPlaceComic(data.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				setLoadingMarketPlaceComic(false);
			}, 1000);
		}
	};

	const addComic = (comic: Comic) => {
		setComics((prevComics) => [...prevComics, comic]);
	};

	const removeComic = (id: string) => {
		setComics((prevComics) =>
			prevComics.filter((comic) => comic._id !== id)
		);
	};

	const getComics = async () => {
		// setLoadingComic(true);
		// fetch my comics
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/comics/all`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${Cookies.get(
							'token'
						)}`,
					},
				}
			);

			const data = await res.json();
			setComics(data.data.comics);
		} catch (error) {
			console.log(error);
		} finally {
			// setLoadingComic(false);
		}
	};

	const getComic = async (id: string) => {
		console.log(comicId);

		if (comics.length > 0) {
			setComic(
				comics.find((comic) => comic._id === id) || null
			);
			setLoadingComic(false);
			console.log('Fetching Cpmments.................');

			try {
				// setLoadingComic(true);
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/comics/get-comments/${id}/${episodeNumber}`,
					{
						method: 'POST',
						headers: {
							'Content-Type':
								'application/json',
						},
					}
				);

				const data = await res.json();
				if (data.success) {
					// setComic(data.data);
					setComments(data.comments);
					console.log(comic);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setTimeout(() => {
					// setLoadingComic(false);
				}, 1000);
			}
			return;
		}
		console.log(comicId);

		// fetch my comics
		try {
			setLoadingComic(true);
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/comics/comic/${id}/${episodeNumber}`
			);

			const data = await res.json();
			if (data.success) {
				setComic(data.data);
				setComments(data.comments);
				console.log(comic);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				setLoadingComic(false);
			}, 1000);
		}
	};

	useEffect(() => {
		getMarketPlaceComics();
		(async () => {
			// fetch my comics
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/comics/all`
				);

				const data = await res.json();
				setHomeComic(
					data.data.comics[
						data.data.comics.length - 1
					]
				);
				setComics(data.data.comics);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<ComicsContext.Provider
			value={{
				comics,
				addComic,
				removeComic,
				getComic,
				getComics,
				loadingComic,
				comic,
				marketPlaceComics,
				getMarketPlaceComics,
				getMarketPlaceComic,
				loadingMarketPlaceComic,
				marketPlaceComic,
				homeComic,
				setHomeComic,
				comments,
				setComments,
			}}
		>
			{children}
		</ComicsContext.Provider>
	);
};
