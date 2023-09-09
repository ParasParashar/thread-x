"use client";
import {TailSpin} from 'react-loader-spinner';
const SmallLoader = () => {
  return (
    <TailSpin
    height="40"
    width="40"
    color="#454141"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  )
}

export default SmallLoader
