import React from 'react'
import SignupSectionHeader from '../Headers/SignupSectionHeader'
import checked from '@/public/svgs/Checked.svg'
import Image from 'next/image'

const EmailVerify = () => {
  return (
    <div className=' '>
          <div className="flex justify-center h-[80%]  items-center ">
          <div className="bg-white flex justify-between items-center flex-col gap-24  p-8 pt-16 rounded-[25px] shadow-lg w-[90%] px-20 min-w-md ">
          <SignupSectionHeader title='Almost done!' subTitle='We have sent you a verification email to set up your account'/>
          <div>
                    <Image src={checked} alt='Check your email' width={303} height={231} />
          </div>
          <div className=' mb-20 w-full'>
          <button
          type="submit"
          className="w-full bg-primary text-white py-3 transition-all  duration-500 delay-0 ease-in-out rounded-lg font-bold hover:bg-secondary"
          >
          Let&apos;s get started
          </button>
          </div>
          </div>
    </div>
    </div>
  )
}

export default EmailVerify