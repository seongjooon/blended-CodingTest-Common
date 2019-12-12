module.exports = function update(prevState, changes) {
  if (Array.isArray(prevState)) {
    for (const prop in changes) {
      if (prop === '$push') {
        prevState.push(changes[prop][0]);
        return prevState;
      } else if (prop === '$unshift') {
        prevState.unshift(changes[prop][0]);
        return prevState;
      }
    }
  }

  const result = getChangesState(changes);

  function getChangesState(changesState, ...keys) {
    for (const prop in changesState) {
      if (typeof changesState[prop] === 'object') {
        if (prop === '$set') {
          return changesState[prop];
        } else if (prop === '$merge') {
          return { ...prevState, ...changesState[prop] };
        }
        return getChangesState(changesState[prop], ...keys.concat(prop));
      }
      return setNextState(keys, changesState[prop]);
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

  return result;
};
