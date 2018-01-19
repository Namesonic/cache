/*
* Cache Class
*
* Accepts ( Promise function for fetching the requested ID parameter )
*  - Returns a matching "cache item" or "new cache item"
*/
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
			item.name = resp.name
			item.data = resp.data
		})
	}
    	
	return this._items.push({id: id, name: 'Item #' + id + '...', _cache: { loading: true }})
    } else {
    	return item
    }
  }
  
  get all () {
  	return this._items
  }
  
  remove (id) {
  	this._items.splice(this._items.findIndex((item) => item.id === id), 1)
  }
}
