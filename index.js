const TelegramBot = require('telegram-node-bot')
const {BotFactory, BotType} = require('./factories/BotFactory')

const tg = BotFactory.getBot(BotType.TELEGRAM)

const TextCommand = TelegramBot.TextCommand

const TodoController = require('./controllers/TodoController')
const OtherwiseController = require('./controllers/OtherwiseController')

const todoCtrl = new TodoController()
const otherwiseCtrl = new OtherwiseController()

tg.router
  .when(new TextCommand('/list', 'getCommand'), todoCtrl)
  .when(new TextCommand('/add', 'addCommand'), todoCtrl)
  .when(new TextCommand('/done', 'doneCommand'), todoCtrl)
  .otherwise(otherwiseCtrl)
