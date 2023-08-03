import styled from 'styled-components'
import frame1 from './frames/frame_window_1.svg'

export const FrameWindow1 = styled.div`
  position: relative;
  
  margin: 3rem 0 ;
  padding: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: -1;

    display: block;
    width: 100%;
    height: 100%;

    filter: brightness(0) invert(0.45) sepia(1) saturate(300%) hue-rotate(-16deg) drop-shadow(2px 4px 6px black);;

    border: 2px solid;
    border-image: url(${frame1 as string});
    border-image-slice: 240;
    border-image-width: 55;
    border-image-outset: 0;
    border-image-repeat: stretch;
  }

  &::after {
    --x: 19px;
    --y: 5px;

    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;

    display: block;
    width: 100%;
    height: 100%;

    clip-path: polygon(
            var(--x) var(--y),
            calc(100% - var(--x)) var(--y),
            calc(100% - var(--y)) var(--x),
            calc(100% - var(--y)) calc(100% - var(--x)),
            calc(100% - var(--x)) calc(100% - var(--y)),
            var(--x) calc(100% - var(--y)),
            var(--y) calc(100% - var(--x)),
            var(--y) var(--x)
    );
    background: #ffd58c11;
    backdrop-filter: blur(8px) brightness(0.8);
`
