'use client';
import Cookies from 'js-cookie';
import { headers } from 'next/headers';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Swal from 'sweetalert2';

interface ProfileContextProps {
  profile: {
    fullName: string;
    email: string;
    nickName: string;
    gender: string;
    country: string;
    language: string;
    profileImage?: string;
    dob?: string;
    phoneNumber?: string;
    location?: string;
    _id: string;
  };
  formData: any;
  setFormData: (data: any) => void;
  updateProfile: (
    newProfile: Partial<{
      fullName: string;
      email: string;
      nickName: string;
      gender: string;
      country: string;
      language: string;
      profileImage?: string;
      _id: string;
    }>
  ) => void;
  myComics: any[];
  allComics: any[];
  setMyComics: (comics: any[]) => void;

  loadingMetrics: boolean;
  setLoadingMetrics: (loadingMetrics: boolean) => void;
  metrics: {
    views: number;
    comments: number;
    likes: number;
    dislikes: number;
    saved: number;
  };

  setMetrics: (metrics: { views: number; comments: number; likes: number; dislikes: number; saved: number }) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    profileImage: '',
    _id: '',
  });

  const [myComics, setMyComics] = useState<any[]>([]);

  const [allComics, setAllComics] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});

  const updateProfile = (newProfile: Partial<typeof profile>) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...newProfile,
    }));
  };

  const [loadingMetrics, setLoadingMetrics] = useState<boolean>(false);

  const [metrics, setMetrics] = useState<{
    views: number;
    comments: number;
    likes: number;
    dislikes: number;
    saved: number;
  }>({
    views: 0,
    comments: 0,
    likes: 0,
    dislikes: 0,
    saved: 0,
  });

  const getMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/metrics`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      const response = await request.json();
      if (response.success) {
        setMetrics(response.data);
      } else {
        // Swal.fire({
        // 	icon: 'error',
        // 	title: 'An error new occurred',
        // 	text: response.error,
        // });
        if (response.error.includes('not authorized')) {
          Cookies.remove('token');
          Cookies.remove('isLoggedIn');
        }
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingMetrics(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (Cookies.get('token')) {
      (async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/get-user`, {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setProfile(data.data.user);
            setFormData(data.data.user);
          } else {
            if (
              data.error.includes('not authorized') ||
              data.error.includes('invalid token') ||
              data.error.includes('jwt expired') ||
              data.error.includes('jwt malformed') ||
              data.error.includes('jwt signature is invalid') ||
              data.error.includes('JSON-web-token validation failed')
            ) {
              Cookies.remove('token');
              Cookies.remove('isLoggedIn');
              // router.push('/signin');
            }
          }
        } catch (error) {
          console.error(error);
        }
      })();

      (async () => {
        // fetch my comics
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comics/comics/user`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          });

          const data = await res.json();
          if (data.error.includes('not authorized')) {
            Cookies.remove('token');
            Cookies.remove('isLoggedIn');
          }

          setMyComics(data.data);
        } catch (error) {
          console.log(error);
        }
      })();
      getMetrics();
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('token')) {
      (async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/get-user`, {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setProfile(data.data.user);
          }
          if (data.error.includes('not authorized')) {
            Cookies.remove('token');
            Cookies.remove('isLoggedIn');
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        updateProfile,
        profile,
        myComics,
        allComics,
        setMyComics,
        formData,
        setFormData,
        setLoadingMetrics,
        metrics,
        loadingMetrics,
        setMetrics,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
