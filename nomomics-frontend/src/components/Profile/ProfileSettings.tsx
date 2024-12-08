import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import profileImg from '@/public/images/default.jpg';
import Button from '../Common/Button';
import { useProfile } from '@/app/contexts/Profile';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { imageToBase64 } from '@/libs/fileConvert';
import Swal from 'sweetalert2';

const ProfileSettings = ({ isCreator }: { isCreator: boolean }) => {
  const { profile, updateProfile, formData, setFormData } = useProfile();

  // const [formData, setFormData] = useState({ ...profile });
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [img, setImg] = useState<StaticImport>(profileImg);
  const token = Cookies.get('token');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleImageUpload = async (e: any) => {
    //Upload image to get image url
    console.log('Uploading Image...');
    console.log(e.target.files);
    const { files } = e.target;
    if (files[0]) {
      try {
        let image = await imageToBase64(files[0]);
        setUploading(true);
        setUploaded(false);
        const imageUploadReq = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/user/upload-image`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ base64Image: image }),
          }
        );
        const response = await imageUploadReq.json();

        if (response.success) {
          setUploaded(true);
          //console.log(response.data);
          setUploading(false);
          setImg(response.data);
          setFormData({ ...formData, profileImage: response.data.imageUrl });
          updateProfile({ profileImage: response.data.imageUrl });
          e.target.files = null;
          e.target.value = null;
          image = null;
          Swal.fire({
            icon: 'success',
            text: 'Image successfully uploaded!.',
          });
        } else {
          setUploaded(true);
          setUploading(false);
          setImg(profileImg);
          image = null;
          e.target.files = null;
          Swal.fire({
            icon: 'error',
            text: response.message,
          });
        }

        // await toast.promise(imgUpload, {
        //   loading: 'uploading Image...',
        //   success: <b>Image Uploaded!</b>,
        //   error: <b>Error uploading Image, Please try again.</b>,
        // });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'An error occurred!, please try again',
        });
      }
    }
  };

  // useEffect(() => {
  //   setFormData({ ...profile });
  // }, [profile]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileUpdate = async () => {
    // Update profile
    const { fullName, nickName, email, gender, language, country } = formData;
    console.log(formData);

    if (!fullName || !nickName || !email || !gender || !language || !country) {
      Swal.fire({
        icon: 'error',
        text: 'All fields are required!',
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/user/update-details`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          body: JSON.stringify({ ...formData }),
        }
      );

      const data = await res.json();
      setLoading(false);
      if (data.error) {
        toast.error(data.error);
        Swal.fire({
          icon: 'error',
          text: data.error,
        });
      } else {
        updateProfile({ ...formData });
        setEditing(false);
        Swal.fire({
          icon: 'success',
          text: 'Profile updated successfully!.',
        });
      }
    } catch (error) {
      // console.log(error);
      // toast.error('An error occurred!, please try again');
      Swal.fire({
        icon: 'error',
        text: 'An error occurred!, please try again',
      });
    }
  };
  console.log(profile);
  return (
    <div className=' flex flex-col w-full max-md:text-xs px-10 py-10 gap-8 pb-48'>
      <div className='flex gap-3 max-md:flex-wrap items-center w-full '>
        <div className='profileImg relative mx-auto mb-9 min-h-16 flex  min-w-16  max-w-16 max-h-16 overflow-hidden rounded-full border border-gray-200 text-center'>
          <Image
            src={formData.profileImage ? formData.profileImage : profileImg}
            alt='Profile Image'
            width={100}
            height={100}
            // className=' w-[100px] h-[100px] rounded-full'
            // alt='login'
            className={
              uploading
                ? 'imgUpload w-full h-full rounded-full'
                : 'w-full h-full rounded-full'
            }
          />
          {editing && (
            <label htmlFor='profileImg'>
              <div className='absolute bottom-0 right-[2px] mx-auto h-1/3 w-full overflow-hidden bg-gray-400  opacity-70'>
                <p className='pl-2 text-xs font-bold text-black opacity-100'>
                  {uploading ? 'Uploading...' : 'Change'}
                </p>
              </div>
              <input
                type='file'
                name='profileImg'
                id='profileImg'
                accept='image/*'
                disabled={uploading}
                onChange={handleImageUpload}
                hidden
              />
            </label>
          )}
        </div>

        <div className='  justify-between flex w-full'>
          <div className='flex gap-3 flex-col'>
            <h1 className=' tracking-wider font-bold'>{profile.fullName}</h1>
            <h3 className=' text-[#909090] tracking-wider'>{profile.email}</h3>
          </div>
          <div className=' w-20'>
            {editing ? (
              <Button
                text={loading ? 'Saving...' : 'Save'}
                onClickFunc={(e: any) => handleProfileUpdate()}
                className=' w-10'
              />
            ) : (
              <Button
                text='Edit'
                onClickFunc={() => setEditing((prev) => !prev)}
                className=' min-w-10'
              />
            )}
          </div>
        </div>
      </div>
      <div className=' flex flex-col gap-8 w-full overflow-auto scrollbar-hide'>
        <div className=' flex gap-8 justify-between w-full items-center'>
          <div className=' flex flex-col gap-2 w-full min-w-40'>
            <label
              htmlFor='firstName'
              className=' text-base max-md:text-xs leading-6 '
            >
              Full Name
            </label>
            <input
              type='text'
              name='fullName'
              disabled={!editing}
              value={formData.fullName}
              onChange={handleChange}
              placeholder={profile.fullName || 'Your Full Name'}
              className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
            />
          </div>
          <div className='flex flex-col gap-2 w-full min-w-40'>
            <label
              htmlFor='nickName'
              className=' text-base max-md:text-xs leading-6'
            >
              Nick Name
            </label>
            <input
              type='text'
              name='nickName'
              disabled={!editing}
              onChange={handleChange}
              value={formData.nickName}
              placeholder={profile.nickName || 'Your Nick Name'}
              className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
            />
          </div>
        </div>
        <div className=' flex gap-8 justify-between w-full items-center'>
          <div className=' flex flex-col gap-2 w-full min-w-40'>
            <label
              htmlFor='gender'
              className=' text-base max-md:text-xs leading-6 '
            >
              Gender
            </label>

            <select
              name='gender'
              title='gender'
              disabled={!editing}
              value={formData.gender}
              onChange={handleChange}
              className=' w-full  outline-none py-3 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
            >
              <option value='' className='text-[#bdbdbd]' disabled>
                Select your gender
              </option>
              <option value='male' className=' text-black'>
                Male
              </option>
              <option value='female' className=' text-black'>
                Female
              </option>
            </select>
          </div>
          <div className='flex flex-col gap-2 w-full min-w-40'>
            <label
              htmlFor='country'
              className=' text-base max-md:text-xs leading-6 '
            >
              Country
            </label>

            <select
              name='country'
              title='country'
              disabled={!editing}
              value={formData.country}
              onChange={handleChange}
              className=' w-full  outline-none py-3 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
            >
              <option value='' className=' text-[#bdbdbd]' disabled>
                Select your country
              </option>
              <option value='nigeria' className=' text-black'>
                Nigeria
              </option>
              <option value='ghana' className=' text-black'>
                Ghana
              </option>
            </select>
          </div>
        </div>
        <div className=' flex gap-8 justify-between w-full items-center'>
          <div className=' flex flex-col gap-2 w-full min-w-40'>
            <label
              htmlFor='language'
              className=' text-base max-md:text-xs leading-6 '
            >
              Language
            </label>

            <select
              name='language'
              title='language'
              disabled={!editing}
              value={formData.language}
              onChange={handleChange}
              className=' w-full  outline-none py-3 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
            >
              <option value='' disabled className='text-[#bdbdbd]'>
                Select your language
              </option>
              <option value='English' className=' text-black'>
                English
              </option>
              <option value='Igbo' className=' text-black'>
                Igbo
              </option>
              <option value='Yoruba' className=' text-black'>
                Yoruba
              </option>
            </select>
          </div>
          <div className='flex flex-col gap-2 w-full min-w-40'>
            <label
              htmlFor='country'
              className=' text-base max-md:text-xs leading-6 '
            >
              Email Address
            </label>

            <input
              type='text'
              disabled
              name='email'
              value={formData.email}
              placeholder={profile.email || 'Your Email Address'}
              className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
            />
          </div>
        </div>

        {isCreator && (
          <>
            <p className='text-sm text-gray-500'>
              Please complete the following information to be fully onboarded as
              a creator.
            </p>
            <div className=' flex gap-8 justify-between w-full items-center'>
              <div className=' flex flex-col gap-2 w-full min-w-40'>
                <label
                  htmlFor='dob'
                  className=' text-base max-md:text-xs leading-6 '
                >
                  Date of Birth
                </label>

                <input
                  type='date'
                  disabled={!editing}
                  name='dob'
                  value={formData.dob}
                  placeholder={profile.dob || 'Your Date of Birth'}
                  className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                />
              </div>
            </div>
            <div className=' flex flex-col gap-2 w-full min-w-40'></div>
            <div className=' flex gap-8 justify-between w-full items-center'>
              <div className='flex flex-col gap-2 w-full min-w-40'>
                <label
                  htmlFor='language'
                  className=' text-base max-md:text-xs leading-6 '
                >
                  Phone Number
                </label>

                <input
                  type='tel'
                  disabled={!editing}
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  placeholder={profile.phoneNumber || 'Your Phone Number'}
                  className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                />
              </div>
              <div className=' flex flex-col gap-2 w-full min-w-40'>
                <label
                  htmlFor='location'
                  className=' text-base max-md:text-xs leading-6 '
                >
                  Location
                </label>

                <input
                  type='text'
                  disabled={!editing}
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={profile.location || 'Your Location'}
                  className=' w-full outline-none py-2 px-2 bg-[#F9F9F9] rounded-md placeholder:text-[#bdbdbd]'
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
