import { IClassConfig } from 'src/meta/configs/types'
import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'

const wizard: IClassConfig = {
  name: CLASSES.wizard,
  races: [RACES.elf, RACES.human],
  alignments: [ALIGNMENTS.good, ALIGNMENTS.neutral, ALIGNMENTS.evil],
}

export default wizard
