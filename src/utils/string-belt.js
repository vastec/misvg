/* global require, module */
/**
 * Utility method for any string manipulations helpers or other utility methods that are used for Strings
 */

'use strict';

module.exports = {
  addIndent: function (number) {
    var str = '', i;
    for (i = 0; i<number; i++) {
      str += ' ';
    }
    return str;
  }
};
