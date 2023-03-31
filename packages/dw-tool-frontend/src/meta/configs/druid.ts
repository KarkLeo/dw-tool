import { IClassConfig } from 'src/meta/configs/types'
import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'

const druid: IClassConfig = {
  name: CLASSES.druid,
  races: [RACES.elf, RACES.human, RACES.halfling],
  alignments: [ALIGNMENTS.chaotic, ALIGNMENTS.good, ALIGNMENTS.neutral],
}

export default druid
