import fs from 'fs'
import qs from 'querystring'

const edit = {
  editHtml: function(url){
    let listJson = fs.readFileSync('list.json');
      let list = JSON.parse(listJson)
    
      let urlObj = qs.parse(url.slice(6))
    
      let find = list.filter(i=> (i.id === urlObj.id)&&(i.date===urlObj.date))[0]
  }
}