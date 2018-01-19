# Cache Class

Useful for referencing a source of cached items, that are retrieved on demand, from an API's promise.

The UNIQUE key "id" is used to keep track of the cached items that are being referenced by components thus preserving reactivity.

Demo https://jsfiddle.net/oshaggy/w6qnonha/

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

This class must be instiantiated with a call back function that returns a promise.  Usually this would be a Promise returned from an AJAX transport like axios.  Alternatively, you can return your own promise with the data you are caching.  

The callback function can accept paramters, in this example, the UNIQUE ID of the cached item that we are seeking.

```
(id) => {
  return new Promise((resolve, reject) => {
    // Your code here...
  })
}
```

## Methods

* remove(id) # removes item from cache
* has(id)    # returns bool if item is in cache
* find(id)   # create item placeholder and use callback to fetch item data
* all()      # returns array of all items in cache
