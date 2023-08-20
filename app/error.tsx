"use client";

import Error from "next/error";
import { useEffect } from "react";
import EmptyState from "./components/EmptyState";
import Button from "./components/Buttons/Button";

interface ErrorStateProps {
  error: Error;
  reset: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <EmptyState
        title="There was an error fetching data"
        subtitle="Try reloading the page with the button below"
      />
      <div className="w-full max-w-[360px] mx-auto">
        <Button label="Try Again" onClick={() => reset()} outline />
      </div>
    </>
  );
};

export default ErrorState;
