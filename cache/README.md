# Promise Cache Class

> A useful javascript class for managing how to provide reactive references to a list of cached items that were **potentially** retrieved via a promise.

The find(id) method either fetches, or returns the cached item so that components sharing a list can maintain a reactive reference to the original item.

Meant for use with VueJs

**New Demo** https://codepen.io/Namesonic/pen/BJEXzd

## Usage

```
data () {
  return {
    myList: [ 1, 5, 7, 12, 18 ],
    members: new Cache( (id) => {
       return axios.get('member/' + id)
      })
  }
}

<div v-for="id in myList">
  <div v-if="members.find(id)">
    <div v-if="members.has(id)">
      {{ members.has(id) }}
    </div>
  </div>
</div>
```

## Constructor

This class must be instiantiated with a call back function that returns a promise.  Usually this would be a Promise returned from an AJAX transport like axios.  Alternatively, you can return your own promise with the data you are providing to the cache.  

The callback function can accept paramters, in this example, the UNIQUE ID of the cached item that we are seeking.

```
(id) => {
  return new Promise((resolve, reject) => {
    // Resolve with data to be cached
    resolve({id: 4, name: 'test item'})
  })
}
```

## Items

The cache class holds an array of "CachedItem"  objects.  Item objects contain the following properties:

<dl>
  <dt>_ready</dt>
  <dd>Has the loading of the cached item completed?</dd>
  <dt>_error</dt>
  <dd>An error message if an exception occurred</dd>
  <dt>_data</dt>
  <dd>The actual data that the item represents</dd>
</dl>

## Methods

<dl>
  <dt>remove(id)</dt>
  <dd>Removes the item from the cache array by its ID</dd>
  <dt>has(id)</dt>
  <dd>Returns boolean if item is present in the cache</dd>
  <dt>find(id)</dt>
  <dd>Returns the cached item locaed by its ID</dd>
  <dt>all()</dt>
  <dd>Returns an array of all the cached items</dd>
  <dt>add(Object)</dt>
  <dd>Adds a RAW data object to the cache</dd>
</dl>

## Future Versions

There are some things that would be good to add.

### Methods

* add(item)    # adds item to the cache
* update(item) # updates the item data

### Cache Expire

Timestamp the activity on the cached item and remove the cached items that arren't being loaded.
