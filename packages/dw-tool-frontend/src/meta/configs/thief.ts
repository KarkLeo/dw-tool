import { IClassConfig } from 'src/meta/configs/types'
import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'

const thief: IClassConfig = {
  name: CLASSES.thief,
  races: [RACES.halfling, RACES.human],
  alignments: [ALIGNMENTS.chaotic, ALIGNMENTS.neutral, ALIGNMENTS.evil],
}

export default thief
