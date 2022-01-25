import React from 'react';
import successtick from '@/assets/successtick.gif';

const SuccessfullyDone = () => {
  return (
    <div className="flex justify-center">
      <div>
        <p className="text-5xl font-semibold text-green-500  text-center">Done</p>
        <img src={successtick} height="100%" width="100%" alt="Successfully" />
      </div>
    </div>
  );
};

export default SuccessfullyDone;
