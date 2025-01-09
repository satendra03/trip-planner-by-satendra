import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    nProgress.configure({ showSpinner: false });

    nProgress.start();

    const handleComplete = () => {
      nProgress.done();
    };

    const timer = setTimeout(handleComplete, 500);

    return () => {
      clearTimeout(timer);
      nProgress.done();
    };
  }, [location]);

  return null;
};

export default ProgressBar;
