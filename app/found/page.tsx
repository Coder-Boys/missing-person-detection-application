import ImageCompare from '@/components/ImageCompare';
import MyData from '@/components/MyData';
import React from 'react';

const page = () => {
  
  return (
    <div className='grid lg:grid-cols-2 gap-10 mx-10 content-center'>
      <MyData/>
    <ImageCompare/>
    </div>
  );
};

export default page;