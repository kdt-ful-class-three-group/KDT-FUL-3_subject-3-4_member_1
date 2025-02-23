import qs from 'querystring'

const home = {
  url: function(obj){
    return qs.stringify(obj).split("&",2).join("&")
  },
  adminUrl : function(obj){
    return 'admin/'+this.url(obj)
  },
  liTag: function(urlFunc,obj){

  }
}