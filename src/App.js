module.exports = function update(prevState, changes) {
  const result = getChangesState(changes);

  if (Array.isArray(prevState)) {
    for (const prop in changes) {
      if (prop === '$push') {
        prevState.push(changes[prop][0]);
        return prevState;
      }
    }
  }

  function setNextState(keys, changesValue) {
    const obj = {};
    const temp = keys.pop();

    if (!temp) {
      return { ...prevState, ...changesValue };
    }

    obj[temp] = changesValue;
    return setNextState(keys, obj);
  }

  function getChangesState(changesState, ...keys) {
    for (const prop in changesState) {
      if (typeof changesState[prop] === 'object') {
        if (prop === '$set') {
          return changesState[prop];
        }
        return getChangesState(changesState[prop], ...keys.concat(prop));
      }
      return setNextState(keys, changesState[prop]);
    }
  }

  return result;
};
