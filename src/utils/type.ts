const isString = (s: any): s is string => typeof s === 'string';

const isNumber = (n: any): n is number => typeof n === 'number';

const isArray = (a: any): a is Array<any> => Array.isArray(a);

const isUnderfined = (u: any): u is undefined => typeof u === 'undefined';

/* 
 * 导出
 */
const type = {
  isString,
  isNumber,
  isArray,
  isUnderfined,
};
export default type;
