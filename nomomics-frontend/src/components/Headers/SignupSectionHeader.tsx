import Image from 'next/image'
import React from 'react'
import signupLogo from '@/public/svgs/signup-logo-1.svg';


const SignupSectionHeader = (props: {title: string; subTitle: string}) => {
          const {title, subTitle} = props
  return (
    <div>
          <div className="flex justify-center mb-4">
          <Image src={signupLogo} alt="Nomomics Logo" width={250} height={100} />
        </div>
        <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
        <p className="text-gray-600 text-[16px] text-center mb-6">
          {subTitle}
        </p>
    </div>
  )
}

export default SignupSectionHeader