export function Effects(effects) {
  return state => effects.forEach(effect => effect(state));
}

export function Matcher(predicate, setup = x => x, teardown = x => x) {
  let isMatching = false;
  return state => {
    let currentDoesMatch = predicate(state);
    if (isMatching) {
      if (currentDoesMatch) {
        return; //do nothing, we were already matching
      } else {
        isMatching = false;
        teardown(state);
      }
    } else {
      if (currentDoesMatch) {
        isMatching = true;
        setup(state);
      } else {
        return; // didn't match, and no prior match.
      }
    }
  };
}
