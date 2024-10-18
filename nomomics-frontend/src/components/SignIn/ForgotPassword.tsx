'use client'
import React from 'react'
import SignupSectionHeader from '../Headers/SignupSectionHeader'
import Button from '../Common/Button'
import Error from '../Common/Error'
import styles from '@/styles/common.module.css'

const ForgotPassword = () => {
          const [email, setEmail] = React.useState<string>('')
          const [errorState, setErrorState] = React.useState<boolean>(false)
  return (

<div className="flex justify-center h-[80%]  items-center ">
      <div className="bg-white  p-8 pt-16 rounded-[25px] shadow-lg w-[80%] px-16 min-w-md max-md:w-full max-md:px-8 ">
        <SignupSectionHeader title='Forgot your password' subTitle='Enter your email to reset your password'/>
        <div className=' mt-6 '>
          <div className={`${email ? styles['slide-in'] : styles['slide-out'] }`}>
               {<Error message='Sorry, we could not find an account with that email, you can try again or signup if you do not have an account' type='recovery'/>}     
          </div>
          
          <form className=' text-lg py-10' >
          <div className="mb-4">
            <label className="block mb-2 font-bold">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e: {target: {value: React.SetStateAction<string>}}) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus-within:outline-primary transition-all  duration-500 delay-0 ease-in-out"
            required
          />
          </div>
          <Button className='w-full bg-primary text-white py-3 transition-all  duration-500 delay-0 ease-in-out rounded-lg font-bold hover:bg-secondary' text='Reset my password' onClickFunc={()=>console.log('You clicked me')}/>
          </form>

        </div>
        
          </div>
          </div>

  )
}

export default ForgotPassword