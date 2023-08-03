import styled from 'styled-components'
import frame from './frames/frame_divider_5.svg'

export const FrameDivider5 = styled.div`
  position: relative;

  padding: 1.25rem 4rem;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 1rem;

    background-image: url(${frame as string});
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 1rem;

    background-image: url(${frame as string});
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
    transform: scaleY(-1);
  }
`
