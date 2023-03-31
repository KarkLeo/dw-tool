import bard from 'src/meta/configs/bard'
import cleric from 'src/meta/configs/cleric'
import druid from 'src/meta/configs/druid'
import fighter from 'src/meta/configs/fighter'
import paladin from 'src/meta/configs/paladin'
import ranger from 'src/meta/configs/ranger'
import thief from 'src/meta/configs/thief'
import { IClassConfig } from 'src/meta/configs/types'
import wizard from 'src/meta/configs/wizard'
import { CLASSES } from 'src/meta/constants'

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
