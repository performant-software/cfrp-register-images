export const generateDate = (dateStr) => {
  const split = dateStr.split('-')

  if (split.length !== 3) {
    return 'Date invalide'
  }

  const date = new Date(split.join('/'))
  const str = date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  // Insert commas after day of week and date
  return str
    .replace(' ', ', ')
    .slice(0, str.length - 4) + ',' + str.slice(str.length - 5, str.length)
}
