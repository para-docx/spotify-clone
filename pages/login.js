import React from 'react'
import { getProviders, signIn } from "next-auth/react"


function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen justify-center ">
      <img className="w-53 mb-6" src="https://cdn.musebycl.io/2019-03/Pandora%20%7C%20Sonic%20Logo.jpg" alt="Spot"/>

      {Object.values(providers).map((provider) =>(
        <div><button className='bg-[orange] text-white p-5 rounded-full' onClick={() => signIn(provider.id, {callbackUrl: '/' })}>
             Login with {provider.name}
          </button></div>
      ))}

    </div>
  )
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  }

}