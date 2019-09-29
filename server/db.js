class Collection {
  constructor(key) {
    this.key = key;
    this.items = {};
  }

  data() {
    return Object.values(this.items);
  }

  insert(item) {
    this.items[item.id] = item;
  }

  remove(collectionKey, item) {
    delete this.items[item.id];
  }

  update({ id, changes }) {
    if (this.items[id]) {
      this.items[id] = { ...this.items[id], ...changes };
    }
  }
}

class DB {
  constructor() {
    this.collections = new Map();
  }

  createCollection(collectionKey) {
    const collection = new Collection(collectionKey);
    this.collections.set(collectionKey, collection);
    return collection;
  }

}

module.exports = DB;
