import { IClassConfig } from 'src/meta/configs/types'
import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'

const paladin: IClassConfig = {
  name: CLASSES.paladin,
  races: [RACES.human],
  alignments: [ALIGNMENTS.lawful, ALIGNMENTS.good],
}

export default paladin
