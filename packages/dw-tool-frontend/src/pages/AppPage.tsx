import React, { useMemo, useReducer } from 'react'
import { Abilities } from 'src/blocks/Abilities'
import { CharacterBonds } from 'src/blocks/CharacterBonds'
import { CharacterLooks } from 'src/blocks/CharacterLooks'
import { CharacterName } from 'src/blocks/CharacterName'
import { CharacterStats } from 'src/blocks/CharactrStats'
import { BGFilter } from 'src/components/common/BGFilter'
import { FrameWindow1 } from 'src/components/common/Frames'
import { Grid, GridMedium } from 'src/components/common/Grid'
import { H1Gothic } from 'src/components/common/Texts'
import { CLASSES_CONFIG_RECORD } from 'src/meta/configs'
import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'
import { ClassButton } from 'src/modules/CreateCharacter'
import { AlignmentItem } from 'src/modules/CreateCharacter/components/AlignmentItem'
import { RaceItem } from 'src/modules/CreateCharacter/components/RaceItem'
import {
  initState,
  reducer,
  setCharacterAbilityAction,
  setCharacterAlignmentAction,
  setCharacterClassAction,
  setCharacterLooksAction,
  setCharacterNameAction,
  setCharacterRaceAction,
} from 'src/modules/CreateCharacter/Store'
import { ProfileInfo } from 'src/modules/Profile/ProfileInfo'
import { mapEnum } from 'src/utils/typping'

export const AppPage = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  const config = useMemo(
    () => (state.class ? CLASSES_CONFIG_RECORD[state.class] : null),
    [state]
  )
  return (
    <BGFilter>
      <ProfileInfo />
      <FrameWindow1>
        {config ? (
          <H1Gothic>{CLASSES[state.class as CLASSES].toUpperCase()}</H1Gothic>
        ) : (
          <Grid>
            {mapEnum(CLASSES).map((i) => (
              <ClassButton
                key={i}
                classValue={i as CLASSES}
                isActive={i === state.class}
                onSelect={() => dispatch(setCharacterClassAction(i as CLASSES))}
              />
            ))}
          </Grid>
        )}

        {config && (
          <GridMedium>
            {config.races.map((i) => (
              <RaceItem
                key={i}
                value={i}
                classValue={config.name}
                isActive={i === state.race}
                onSelect={() => dispatch(setCharacterRaceAction(i as RACES))}
              />
            ))}
          </GridMedium>
        )}

        {config && (
          <GridMedium>
            {config.alignments.map((i) => (
              <AlignmentItem
                key={i}
                value={i}
                classValue={config.name}
                isActive={i === state.alignment}
                onSelect={() =>
                  dispatch(setCharacterAlignmentAction(i as ALIGNMENTS))
                }
              />
            ))}
          </GridMedium>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 100,
          }}
        >
          <div style={{ width: '50%', maxWidth: '500px' }}>
            {/* side A */}

            {config && (
              <CharacterName
                classValue={config.name}
                race={state.race}
                value={state.name || ''}
                onChange={(value) => dispatch(setCharacterNameAction(value))}
              />
            )}

            {config && (
              <CharacterLooks
                classValue={config.name}
                value={state.looks || {}}
                onChange={(index, value) =>
                  dispatch(setCharacterLooksAction(index, value))
                }
              />
            )}

            {config && <CharacterBonds classValue={config.name} />}
          </div>

          <div>
            {/* side B */}
            {config && (
              <Abilities
                abilities={state.abilities}
                onChange={(ability, value) =>
                  dispatch(setCharacterAbilityAction(ability, value))
                }
              />
            )}

            {config && config.stats && state.abilities && (
              <CharacterStats
                stats={config.stats}
                abilities={state.abilities}
              />
            )}
          </div>
        </div>
      </FrameWindow1>
    </BGFilter>
  )
}
