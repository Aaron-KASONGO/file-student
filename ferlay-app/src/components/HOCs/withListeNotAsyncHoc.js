import React, { useEffect, useState } from 'react'
import { dataDossiers } from '../../dashboard/accueil/AccueilComponent';

export const withListeNotAsyncHoc = (WrappedComponent, getData) => {
  
  const GetDataComponent = (props) => {
    const data = getData(props);
    
    return (
      <WrappedComponent {...props} data={data} />
    )
  }
  return GetDataComponent;
}
