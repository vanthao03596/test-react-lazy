import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BlurredSmallImage = styled.div`
  background-image: url(${props => props.src});
  filter: ${props => (!props.loaded ? "blur(3px)" : "unset")};
  width: ${props => props.width};
  height: ${props => props.height};
  transition: filter 1s ease;
  background-position: 50% 50%;
  background-origin: border-box;
  background-size: cover;
  flex-shrink: 0;
`;

const imgShadow = new Image();

const isImageCached = image => {
  imgShadow.src = image;
  return imgShadow.complete;
};

const THUMBS_PATH = "/20/20";
const IMAGES_PATH = "/1000/1000";

export const LazyBlurLoad = ({ path, image,id, ...props }) => {
  const finalImgURI = path + id + IMAGES_PATH;
  const isLoaded = isImageCached(finalImgURI);
  const [loadState, setLoadState] = useState({
    src: isLoaded ? finalImgURI : path + id +THUMBS_PATH,
    loaded: isLoaded
  });

  useEffect(() => {
    if (!isLoaded) {
      const img = new Image();
      img.onload = function() {
        setLoadState({
          src: img.src,
          loaded: true
        });
      };
      img.src = finalImgURI;
    }
  }, []);


  return (
    <BlurredSmallImage
      {...props}
      src={loadState.src}
      loaded={loadState.loaded}
    />
  );
};
