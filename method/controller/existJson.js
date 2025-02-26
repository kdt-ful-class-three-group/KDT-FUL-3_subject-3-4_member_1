import exp from 'constants';
import fs from 'fs'

const existJson = {
  /**
   * list.json 파일이 존재하지 않을 때 빈 배열을 JSON문자열로 갖는 파일 생성
   */
  check : function(){
    if (!fs.existsSync("list.json")) {
      fs.writeFileSync("list.json", JSON.stringify([]));
    }
  }
}

export default existJson