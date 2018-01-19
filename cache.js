
/*
* Cache Class
*
* Accepts ( Promise function for fetching the requested ID parameter )
*
* eg.  let Members = new Cache( (id) => {
    return axios.get('member/' + id)
  })
*
* eg. let Items = new Cache( (id) => {
			return new Promise((resolve, reject) => {
      	setTimeout(() => {
            if (dataSource.find((data) => data.id == id)) {
            	resolve(dataSource.find((data) => data.id == id))
            } else {
            	reject('This not found')
            }
        }, 2000)
      })
})
*
* Returns a matching "cache item" or "new cache item"
*
* - can be extended into Cache types like
*	class MemberCache extends Cache ()
*
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
          let i = this.has(id)
          if (i) {
            i.data = resp
            i._cache.ready = true
          }
        })
        .catch((err) => {
          let i = this.has(id)
          if (i) {
            i._cache.ready = true
            i._cache.error = err
          }
        })

      return this._items.push({
        id: id,
        _cache: { ready: false }
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
