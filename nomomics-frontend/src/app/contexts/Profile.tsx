import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileContextProps {
  profile: {
    fullName: string;
    email: string;
    nickName: string;
    gender: string;
    country: string;
    language: string;
  };
  updateProfile: (
    newProfile: Partial<{
      fullName: string;
      email: string;
      nickName: string;
      gender: string;
      country: string;
      language: string;
    }>
  ) => void;
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
  });

  const updateProfile = (newProfile: Partial<typeof profile>) => {
    setProfile((prevProfile) => ({ ...prevProfile, ...newProfile }));
  };

  return (
    <ProfileContext.Provider value={{ updateProfile, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};
