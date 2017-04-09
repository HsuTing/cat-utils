'use strict';

import process from 'process';

export const env = names => {
  if(names instanceof Array) {
    names.forEach(name => {
      if(!process.env[name])
        throw new Error(`process.env.${name} is undefined.\n${JSON.stringify(names)}`);
    });
  } else {
    if(!process.env[names])
      throw new Error(`process.env.${names} is undefined.`);
  }

  return true;
};

export const password = value => {
  let score = 0;

  if(!value)
    return score;

  let letters = {};
  Array.from(value).forEach(letter => {
    letters[letter] = (letters[letter] || 0) + 1;
    score += 5.0 / letters[letter];
  });

  const variations = {
    digits: /\d/.test(value),
    lower: /[a-z]/.test(value),
    upper: /[A-Z]/.test(value),
    nonWords: /\W/.test(value)
  };

  let variationCount = 0;
  for(const check in variations) {
    variationCount += variations[check] ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  if(score > 80)
    return 'strong';
  if(score > 60)
    return 'normal';

  return 'weak';
};
