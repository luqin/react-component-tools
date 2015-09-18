import notifier from 'node-notifier';
import path from 'path';

function getLocMessage(error, loc) {
    let filePath = error.module.resource.split(path.sep);
    return `${filePath[filePath.length - 1]} at [${loc.line},${loc.column}]`;
}

function NotifyPlugin() {
    this.plugin('done', function (stats) {
        // TODO: Handle warnings as well.
        let error = stats.compilation.errors[0];
        if (!error) {
            return;
        }

        let loc = error.error.loc;
        let msg;
        if (loc) {
            msg = getLocMessage(error, loc);
        } else if (error.message) {
            msg = error.message;
        } else {
            return;
        }

        notifier.notify({
            title: 'Webpack Error',
            message: msg
        });
    });
}

export default NotifyPlugin;