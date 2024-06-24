const { rl } = require('./useradd.js');

function hidden(query, callback) {
    var stdin = process.openStdin();
    var onDataHandler = function (char) {
        char = char + "";
        switch (char) {
            case "\n":
            case "\r":
            case "\u0004":
                // Remove this handler
                stdin.removeListener("data", onDataHandler);
                break; //stdin.pause(); break;
            default:
                process.stdout.write("\033[2K\033[200D" + query + Array(rl.line.length + 1).join("*"));
                break;
        }
    };
    process.stdin.on("data", onDataHandler);

    rl.question(query, function (value) {
        rl.history = rl.history.slice(1);
        callback(value);
    });
}
exports.hidden = hidden;
