var argv = require('minimist')(process.argv.slice(2), {
	boolean: ['toM', 'toJ', 'm', 'j', 'stdin']
});
var colors = require('colors');

var settings = {
	toM:  !!(argv.m || argv.toM),
	toJ: !!(argv.j || argv.toJ),
        indentLength: !!(argv.i || argv.indentLength),
	stdin: !!argv.stdin,
	filename: argv._[argv._.length - 1]
};


var USAGE = "J2M: Convert from JIRA text formatting to GitHub Flavored MarkDown and back again \n" +
	"\n" +
	"$ j2m [--toM|--toJ] [--stdin] $filename \n" +
	"\n" +
	"Options: \n" +
	"--toM, -m:          Treat input as jira text and convert it to Markdown \n" +
	"--toJ, -j:          Treat input as markdown text and convert it to Jira \n" +
        "--indentLength, -i: Indentation length in number of spaces \n" +
	"--stdin:            Read input from stdin. In this case the give filename is ignored \n";

function exit(message, code) {
	console.error('\n' + message.red +  '\n');
	console.log(USAGE);
	process.exit(code);
}

if (settings.indentLength) {
    settings.indentLength = Number(settings.indentLength);
}
else {
    settings.indentLength = 4
}


if (!settings.stdin && !settings.filename) {
	// TODO: neither stdin nor file?
	exit('No file was specified. Did you mean to use --stdin ?');
}


if (!settings.toM && !settings.toJ) {
	// TODO: Try to detect it automatically
	if (settings.filename && settings.filename.indexOf('.md') > -1) {
		settings.toJ = true;
	} else {
		exit('Neither --toM nor --toJ was specified', 2);
	}
}

module.exports = settings;
