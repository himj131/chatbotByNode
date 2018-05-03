class CommandStr {
    static getCommandArgs (text) {
        return text.split(' ').splice(1).join(' ')
    }
}

module.exports = CommandStr