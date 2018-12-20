/**
 * @typedef {!{id: number, completed: boolean, title: string}}
 */
export var Item: any;

/**
 * @typedef {!Array<Item>}
 */
export var ItemList: Array<any>;

/**
 * Enum containing a known-empty record type, matching only empty records unlike Object.
 *
 * @enum {Object}
 */
const Empty = {
  Record: {}
};

/**
 * Empty ItemQuery type, based on the Empty @enum.
 *
 * @typedef {Empty}
 */
export var EmptyItemQuery: any;

/**
 * Reference to the only EmptyItemQuery instance.
 *
 * @type {EmptyItemQuery}
 */
export const emptyItemQuery = Empty.Record;

/**
 * @typedef {!({id: number}|{completed: boolean}|EmptyItemQuery)}
 */
export var ItemQuery: any;

/**
 * @typedef {!({id: number, title: string}|{id: number, completed: boolean})}
 */
export var ItemUpdate: any;
