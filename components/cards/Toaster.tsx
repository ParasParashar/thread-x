"use client";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <div>
      <Toaster 
       position="top-center" 
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#333", 
          color: "#fff", 
          borderRadius: "20px", 
        },
      }}
    />
    </div>
  );
};

export default ToasterProvider;
