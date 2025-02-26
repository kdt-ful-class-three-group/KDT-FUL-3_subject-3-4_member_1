//json가져오기위한 모듈
import read from '../read.js'
//json파일 유무 확인을 위한 모듈
import exist from '../controller/existJson.js'
//tag모듈
import tag from './tag.js'
//makeurl모듈
import url from '../controller/url.js'

const html = {
  home : function(){

    //json파일 존재하는지 확인 후 없으면 생성
    exist.check()
    //json파일 있으면 가져옴
    let list = read.readList()

    let ul = tag.ulTag(url.makeUrl,list)
    console.log(ul)

  }
}

html.home()