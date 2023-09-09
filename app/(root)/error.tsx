"use client"
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="head-text text-xl text-gray-600">Uh Oh</h1>
        <h2 className="font-light text-lg text-gray-700">Something went wrong!</h2>
    </div>
  );
};

export default ErrorState;
