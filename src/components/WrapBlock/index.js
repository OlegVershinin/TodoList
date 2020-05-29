import React from 'react';
import s from './WrapBlock.module.scss';

const WrapBlock = ({ hideBackground = false, children }) => {
  const styleCover = hideBackground ? { backgroundImage: 'none' } : {};
  return (
    <div className={s.cover} style={styleCover}>
      <div className={s.wrap}>
        {/* <ReactLogoSvg className={s.img} /> */}
        {children}
      </div>
    </div>
  );
};

export default WrapBlock;
