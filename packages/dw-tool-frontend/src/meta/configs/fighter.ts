import { IClassConfig } from 'src/meta/configs/types'
import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'

const fighter: IClassConfig = {
  name: CLASSES.fighter,
  races: [RACES.dwarf, RACES.elf, RACES.human, RACES.halfling],
  alignments: [ALIGNMENTS.good, ALIGNMENTS.neutral, ALIGNMENTS.evil],
}

export default fighter
