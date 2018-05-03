const TelegramBot = require('telegram-node-bot')
const CommandStr = require('../utils/CommandStr')
const CloudeStorage = require('../db/Cloudstorage')

class TodoController extends TelegramBot.TelegramBaseController {
  getHandler($) {
    CloudeStorage.getTodos()
    .then(todos => {
      $.sendMessage(this.parseTodos(todos), { parse_mode: 'Markdown' })
    })
    // $.getUserSession('todos').then(todos => {
      
    // })
  }

  addHandler($) {
    const todo = CommandStr.getCommandArgs($.message.text)      
    if (!todo) return $.sendMessage('todo를 입력해 주세요')
    const addTodo = {
      desc: todo || '',
      due_date: new Date(),
      is_done: false
    }

    CloudeStorage.insertTodo(addTodo)
    .then(result => {
      $.sendMessage(`${addTodo.desc}가 할 일에 추가 됬습니다.`)
    })
    .catch(err => {
      $.sendMessage(`서버 에러입니다. 나중에 다시 시도해 주세요.`)
    })
  }

  doneHandler($) {
    let id = CommandStr.getCommandArgs($.message.text)
    if (!id) return $.sendMessage('없는 번호 입니다.')

    CloudeStorage.updateTodo(id, {is_done: true})
    .then(_ => {
      $.sendMessage(`완료했습니다.`)
    })

    // $.getUserSession('todos').then(todos => {
    //   const todo = todos[index]
    //   if (!todo) return $.sendMessage('없는 번호 입니다.')
    //   todos.splice(index, 1)
    //   $.setUserSession('todos', todos)
    //   $.sendMessage(`${todo}를 완료했습니다.`)
    // })
  }

  parseTodos(todos) {
    if (!todos.length) return '할일이 없네'
    let result = '* 할일 목록 *\n\n'
    todos.forEach((todo, i) => {
      result += `* ${todo.id} * - ${todo.desc}\n`
    })
    return result
  }

  get routes() {
    return {
      getCommand: 'getHandler',
      addCommand: 'addHandler',
      doneCommand: 'doneHandler',
    }
  }
}

module.exports = TodoController
