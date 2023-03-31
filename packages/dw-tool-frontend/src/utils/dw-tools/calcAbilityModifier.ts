export const calcAbilityModifier = (abilityScore: number): number => {
  if (abilityScore < 4) return -3
  if (abilityScore < 6) return -2
  if (abilityScore < 9) return -1
  if (abilityScore < 13) return 0
  if (abilityScore < 16) return 1
  if (abilityScore < 18) return 2
  return 3
}
