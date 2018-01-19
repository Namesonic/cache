class Cache {
	constructor (payload) {
  	this._items = payload || []
  }
  
  has (id) {
	  return this._items.find((item) => item.id === id )
  }
  
  find (id) {
  	let item = this.has(id)
  	if (!item) {
    	setTimeout( () => {
      	let itemPlaceholder = this.has(id)
        if (itemPlaceholder) {
        	let apiData = data.find((i) => i.id === id)
          if (apiData) {
	        	itemPlaceholder.name = apiData.name
            itemPlaceholder.data = apiData.data
          } else {
          	itemPlaceholder.name = 'Not Found!'
          }
        }
      }, 2000)
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