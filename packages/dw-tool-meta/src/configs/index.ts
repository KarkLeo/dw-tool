import bard from './bard'
import cleric from './cleric'
import druid from './druid'
import fighter from './fighter'
import paladin from './paladin'
import ranger from './ranger'
import thief from './thief'
import { IClassConfig } from '../models'
import wizard from './wizard'
import { CLASSES } from '../constants'

export const CLASSES_CONFIG_RECORD: Record<CLASSES, IClassConfig> = {
  bard,
  cleric,
  druid,
  fighter,
  paladin,
  ranger,
  thief,
  wizard,
}

export { bard, cleric, druid, fighter, paladin, ranger, thief, wizard }
