import { IClassConfig } from 'src/meta/configs/types'
import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'

const ranger: IClassConfig = {
  name: CLASSES.ranger,
  races: [RACES.elf, RACES.human],
  alignments: [ALIGNMENTS.chaotic, ALIGNMENTS.good, ALIGNMENTS.neutral],
}

export default ranger
