import cloneDeep from 'lodash/cloneDeep';

export function removeNullAndUndefinedFromObject<Obj extends {}>(obj: Obj) {
  const copy = cloneDeep(obj);

  (Object.keys(copy) as (keyof Obj)[]).forEach(key => {
    if (copy[key] === null || copy[key] === undefined) {
      delete copy[key];
    }
  });

  return copy;
}
