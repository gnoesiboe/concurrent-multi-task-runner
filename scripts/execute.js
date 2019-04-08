const task = process.argv.slice(2, 3).pop();

if (!task) {
    throw new Error(
        'Please supply the task as the first argument to this script'
    );
}

const configParser = require('./utility/configParser');
const colorHelper = require('./utility/colorHelper');
const subTasks = configParser.getSubTasksForTask(task);

const commands = subTasks.map(({ workingDirectory, name, command }, index) => {
    command = workingDirectory
        ? `cd ${workingDirectory} && ${command}`
        : command;

    const prefixColor = `${colorHelper.determineColorForIndex(index)}.bold`;

    return { command, name, prefixColor };
});

const options = {
    prefixLength: 20,
};

const concurently = require('concurrently');

concurently(commands, options)
    .then(() => {
        console.log(`\nTask '${task}' successfuly finished\n`);
    })
    .catch(error => {
        console.error('\nTasks exited with error code:\n', error);
    });
