import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import abilities from './en/abilities.json'
import alignments from './en/alignments.json'
import classes from './en/classes.json'
import bard from './en/classes/bard.json'
import common from './en/common.json'
import dices from './en/dices.json'
import races from './en/races.json'
import test from './en/test.json'

export const resources = {
  en: {
    races,
    alignments,
    classes,
    abilities,
    test,
    bard,
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
    'test',
    'bard',
    'common',
    'dices',
  ],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
})
