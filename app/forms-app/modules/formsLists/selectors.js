import { createSelector } from 'reselect';

import { NAME } from './constants';
import { getEntityState } from '../entities/selectors';

export const getLocalState = (state) => state[NAME];
export const getListState = (state, list) => {
  return getLocalState(state)[list] || {};
}

export const getEntries = (state, props) => {
  return getListState(state, props.list).entries || [];
}

export const getSortKey = (state, props) => {
  return getListState(state, props.list).sortKey;
}

export const getSortDirection = (state, props) => {
  return getListState(state, props.list).direction;
}

export const getSort = createSelector(
  getSortKey,
  getSortDirection,
  (sortKey, direction) => ({
    sortKey,
    direction,
  })
);

export const makeGetSortedEntries = () => {
  const getFormsEntities = (state) => getEntityState(state, "forms");

  const getDESCList = createSelector(
    getEntries,
    getFormsEntities,
    getSortKey,
    (entries, forms, key) => {
      return sort(entries, forms, key);
    }
  );

  const getSortedList = createSelector(
    getDESCList,
    getSortDirection,
    (forms, dir) => {
      return dir === "asc" ?
        Object.assign([], forms).reverse() :
        forms;
    }
  );

  return getSortedList;
}

function sort(entries, forms, key) {

  return entries.sort(
    (id1, id2) => -naturalSort(forms[id1][key], forms[id2][key])
  );
}

function naturalSort (a, b) {
  var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
    sre = /(^[ ]*|[ ]*$)/g,
    dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
    hre = /^0x[0-9a-f]+$/i,
    ore = /^0/,
    i = function(s) { return naturalSort.insensitive && ('' + s).toLowerCase() || '' + s; },
    // convert all to strings strip whitespace
    x = i(a).replace(sre, '') || '',
    y = i(b).replace(sre, '') || '',
    // chunk/tokenize
    xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
    yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
    // numeric, hex or date detection
    xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
    yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
    oFxNcL, oFyNcL;
  // first try and sort Hex codes or Dates
  if (yD) {
    if ( xD < yD ) { return -1; }
    else if ( xD > yD ) { return 1; }
  }
  // natural sorting through split numeric strings and default strings
  for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
    // find floats not starting with '0', string or 0 if not defined (Clint Priest)
    oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
    oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
    // handle numeric vs string comparison - number < string - (Kyle Adams)
    if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
    // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
    else if (typeof oFxNcL !== typeof oFyNcL) {
      oFxNcL += '';
      oFyNcL += '';
    }
    if (oFxNcL < oFyNcL) { return -1; }
    if (oFxNcL > oFyNcL) { return 1; }
  }
  return 0;
};