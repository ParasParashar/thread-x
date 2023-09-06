"use client";
import {ThreeCircles} from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center ">
      <ThreeCircles
         height="200"
         width="200"
        color="#3b82f6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default Loader;
