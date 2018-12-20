import {Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery} from './item';

export default class Store {
  protected liveTodos: any;
  protected localStorage = window.localStorage;
  /**
   * @param {!string} name Database name
   * @param {function()} [callback] Called when the Store is ready
   */
  constructor(name: any, callback: any) {
    if (callback) {
      callback();
    }
  }

  /**
   * Write the local ItemList to localStorage.
   *
   * @param {ItemList} todos Array of todos to write
   */
  setLocalStorage(todos: any) {
    this.liveTodos = todos;
    this.localStorage.setItem(name, JSON.stringify(this.liveTodos));
  }

  /**
   * Read the local ItemList from localStorage.
   *
   * @returns {ItemList} Current array of todos
   */

  getLocalStorage() {
    return this.liveTodos || JSON.parse(this.localStorage.getItem(name) || '[]');
  }

  /**
   * Find items with properties matching those on query.
   *
   * @param {ItemQuery} query Query to match
   * @param {function(ItemList)} callback Called when the query is done
   *
   * @example
   * db.find({completed: true}, data => {
   *   // data shall contain items whose completed properties are true
   * })
   */
  find(query: any, callback: any) {
    const todos = this.getLocalStorage();
    let k;

    callback(todos.filter((todo: any) => {
      for (k in query) {
        if (query[k] !== todo[k]) {
          return false;
        }
      }
      return true;
    }));
  }

  /**
   * Update an item in the Store.
   *
   * @param {ItemUpdate} update Record with an id and a property to update
   * @param {function()} [callback] Called when partialRecord is applied
   */
  update(update: any, callback: any) {
    const id = update.id;
    const todos = this.getLocalStorage();
    let i = todos.length;
    let k;

    while (i--) {
      if (todos[i].id === id) {
        for (k in update) {
          todos[i][k] = update[k];
        }
        break;
      }
    }

    this.setLocalStorage(todos);

    if (callback) {
      callback();
    }
  }

  /**
   * Insert an item into the Store.
   *
   * @param {Item} item Item to insert
   * @param {function()} [callback] Called when item is inserted
   */
  insert(item: any, callback: any) {
    const todos = this.getLocalStorage();
    todos.push(item);
    this.setLocalStorage(todos);

    if (callback) {
      callback();
    }
  }

  /**
   * Remove items from the Store based on a query.
   *
   * @param {ItemQuery} query Query matching the items to remove
   * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
   */
  remove(query: any, callback: any) {
    let k;

    const todos = this.getLocalStorage().filter((todo: any) => {
      for (k in query) {
        if (query[k] !== todo[k]) {
          return true;
        }
      }
      return false;
    });

    this.setLocalStorage(todos);

    if (callback) {
      callback(todos);
    }
  }

  /**
   * Count total, active, and completed todos.
   *
   * @param {function(number, number, number)} callback Called when the count is completed
   */
  count(callback: any) {
    this.find(emptyItemQuery, (data: any) => {
      const total = data.length;

      let i = total;
      let completed = 0;

      while (i--) {
        completed += data[i].completed;
      }
      callback(total, total - completed, completed);
    });
  }
}
