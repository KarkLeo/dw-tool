import styled from 'styled-components'
import frame11 from './frames/frame_button_11.svg'
import frame6 from './frames/frame_button_6.svg'

export const FrameButton6 = styled.div`
  padding: 1.5rem 2rem;

  border: 2px solid;
  border-image: url(${frame6 as string});
  border-image-slice: 70;
  border-image-width: 70;
  border-image-outset: 0;
  border-image-repeat: stretch;
`

export const FrameButton11 = styled.div`
  padding: 0.25rem 2rem;

  border: 1px solid;
  border-image: url(${frame11 as string});
  border-image-slice: 50 60;
  border-image-width: 40;
  border-image-outset: 0;
  border-image-repeat: stretch;
`
