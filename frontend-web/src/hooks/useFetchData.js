import { useEffect, useState } from 'react';
export const useFetchData = fn => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fn();
      setData(fetchedData);
    };
    fetchData();
  }, []);
  return data;
};