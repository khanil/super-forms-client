import React from 'react';
import * as cols from './columns';

export const personal = (component) => [
  cols.index,
  cols.title,
  /*[cols.type, */cols.basis/*]*/,
  [cols.created, cols.edited],
  [cols.responses, cols.sent, cols.expires],
  //cols.controlsForPerson(component)
];


export const org = (component) => [
  cols.index,
  cols.author,
  cols.title,
  /*[cols.type, */cols.basis/*]*/,
  [cols.created, cols.edited],
  [cols.responses, cols.sent, cols.expires],
  //cols.controlsForOrg(component)
];