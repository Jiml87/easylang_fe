export const hideTargetText = (wholeText: string, subText: string): string => {
  const fake = subText
    .split('')
    .map(() => '_')
    .join(' ');

  const reg = new RegExp(`${subText}`, 'i');

  return wholeText.replace(reg, fake);
};
