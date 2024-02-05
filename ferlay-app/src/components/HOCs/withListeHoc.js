import React, { useEffect, useState } from 'react'
import { dataDossiers } from '../../dashboard/accueil/AccueilComponent';

export const withListeHoc = (WrappedComponent, getData) => {
  
  const GetDataComponent = (props) => {
    const [alist, setAlist] = useState([]);

    const getAllData = async () => {
      const data = await getData(props);
      setAlist(data)
    }

    useEffect(() => {
      
      return () => {
        getAllData();
      };
    }, []);
    
    return (
      <WrappedComponent {...props} data={alist} />
    )
  }
  return GetDataComponent;
}
