import { useEffect, useState } from "react";

const localCache = {};

export const useFetch = (url) => {
  const [state, setstate] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setstate({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {
    if (localCache[url]) {
      console.log("Usando cache");
      setstate({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });

      return;
    }

    setLoadingState();

    const res = await fetch(url);

    // Sleep
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!res.ok) {
      setstate({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: res.status,
          message: res.statusText,
        },
      });

      return;
    }

    const data = await res.json();

    setstate({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });

    localCache[url] = data;
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
