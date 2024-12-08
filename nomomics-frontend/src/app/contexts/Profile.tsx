import Cookies from 'js-cookie';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

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
    }>
  ) => void;
  myComics: any[];
  allComics: any[];
  setMyComics: (comics: any[]) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

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

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    profileImage: '',
  });

  const [myComics, setMyComics] = useState<any[]>([]);

  const [allComics, setAllComics] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});

  const updateProfile = (newProfile: Partial<typeof profile>) => {
    setProfile((prevProfile) => ({ ...prevProfile, ...newProfile }));
  };

  useEffect(() => {
    if (Cookies.get('token')) {
      (async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/user/get-user`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setProfile(data.data.user);
            setFormData(data.data.user);
          }
        } catch (error) {
          console.error(error);
        }
      })();

      (async () => {
        // fetch my comics
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/comics/comics/user`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
              },
            }
          );

          const data = await res.json();
          setMyComics(data.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('token')) {
      (async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/user/get-user`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setProfile(data.data.user);
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
