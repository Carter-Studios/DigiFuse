import React from 'react';

const RippleBackground: React.FC = () => {
  return (
    <div className="ripple-background fixed inset-0 z-0 overflow-hidden">
      <div className="circle xxlarge shade1"></div>
      <div className="circle xlarge shade2"></div>
      <div className="circle large shade3"></div>
      <div className="circle medium shade4"></div>
      <div className="circle small shade5"></div>
    </div>
  );
};

export default RippleBackground;
