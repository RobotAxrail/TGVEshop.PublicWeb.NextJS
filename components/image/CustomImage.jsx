import { useState } from "react";
import Image from "next/image";

export const NormalImage = (props) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [paddingTop, setPaddingTop] = useState(0);
  
  const onImageLoad = (e) => {
    setSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    })
    setPaddingTop(`calc( 100% / (${e.target.naturalWidth} / ${e.target.naturalHeight}) )`);
  };

  return (
    <div className="relative text-center" style={{ aspectRatio: `calc(${size.width} / ${size.height})` }}>
      <Image
        layout='fill'
        objectFit='contain'
        onLoad={onImageLoad}
        {...props}
      />
    </div>
  );
};
