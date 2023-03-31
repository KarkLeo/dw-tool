import { IClassConfig } from 'src/meta/configs/types'
import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'

const cleric: IClassConfig = {
  name: CLASSES.cleric,
  races: [RACES.dwarf, RACES.human],
  alignments: [ALIGNMENTS.good, ALIGNMENTS.lawful, ALIGNMENTS.evil],
}

export default cleric
