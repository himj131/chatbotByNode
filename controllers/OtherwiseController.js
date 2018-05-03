const Telegram = require('telegram-node-bot')

class OtherwiseController extends Telegram.TelegramBaseController {
  handle($) {
    $.sendMessage(`제가 할 수 없는 일 입니다.
/list : 할일 목록 보기
/add <할일> : 할일 추가
/done <목록 번호> : 할일 완료

를 할 수 있습니다.
    `)
  }
}

module.exports = OtherwiseController
