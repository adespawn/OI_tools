module.exports = {
    prSettings: class {
        constructor(prID) {
            this.prID = prID
            this.sol = []
        }
    },
    projErr: class {
        constructor(code, msg) {
            this.code = code
            this.msg = msg
        }
    }
}