import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import abilities from './en/abilities.json'
import alignments from './en/alignments.json'
import classes from './en/classes.json'
import bard from './en/classes/bard.json'
import cleric from './en/classes/cleric.json'
import druid from './en/classes/druid.json'
import fighter from './en/classes/fighter.json'
import paladin from './en/classes/paladin.json'
import ranger from './en/classes/ranger.json'
import thief from './en/classes/thief.json'
import wizard from './en/classes/wizard.json'
import common from './en/common.json'
import dices from './en/dices.json'
import races from './en/races.json'

export const resources = {
  en: {
    races,
    alignments,
    classes,
    abilities,
    bard,
    cleric,
    druid,
    fighter,
    paladin,
    ranger,
    thief,
    wizard,
    common,
    dices,
  },
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: [
    'races',
    'alignments',
    'classes',
    'abilities',
    'bard',
    'cleric',
    'druid',
    'fighter',
    'paladin',
    'ranger',
    'thief',
    'wizard',
    'common',
    'dices',
  ],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
})
