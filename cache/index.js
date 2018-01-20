class Cache {
	constructor (callback) {
  	this._items = []
		this._fetch = callback
  }
  
  has (id) {
	  return this._items.find((item) => item.id === id )
  }
  
  find (id) {
  	let item = this.has(id)
  	if (!item) {
      // Run the FETCH callback
      this._fetch(id)
        .then((resp) => {
        	// get cache item
          let i = this.has(id)
          if (i) {
 		        // Spread the response into this item
	          Object.assign(i, {...resp})
            // Set cache item ready state
            i._ready = true
          }
        })
        .catch((err) => {
          let i = this.has(id)
          if (i) {
            i._ready = true
            i._error = err
          }
        })

      return this._items.push({
		id: id,
		_ready: false
	      })
	  } else {
			return item
	  }
  }
  
  get all () {
  	return this._items
  }
    
  remove (id) {
  	this._items.splice(
    	this._items.findIndex((item) =>
    	item.id === id), 1)
  }
}
