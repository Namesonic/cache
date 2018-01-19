# Cache Class

Useful for referencing a source of cached items (defined by an ID) that are retrieved from an API's promise.

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
