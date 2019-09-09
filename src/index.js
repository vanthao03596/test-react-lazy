import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { LazyBlurLoad } from "./BlurLoader";
import LazyLoad from "react-lazyload";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

const photos = Array(100)
  .fill(1)
  .map((p, i) => ({
    id: i + getRandomInt(1000)
  }));

const Grid = styled.div`
  display: grid;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;

export const ImgLoadingBlock = ({ height = 180, width = 200 }: any) => (
  <div style={{ background: "#f1f4ff", height }} />
);

const size = {
  height: "400px",
  width: "100%"
};

const App = () => {
  return (
    <Grid>
      {photos.map((p, i) => (
        <LazyLoad
          {...size}
          once
          key={p.id}
          placeholder={
            <ImgLoadingBlock height={size.height} width={size.width} />
          }
          debounce={100}
        >
          <LazyBlurLoad
            {...size}
            id={`/id/${p.id+1}`}
            image={`?random=${i + 1}`}
            path="https://picsum.photos"
          />
        </LazyLoad>
      ))}
    </Grid>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
