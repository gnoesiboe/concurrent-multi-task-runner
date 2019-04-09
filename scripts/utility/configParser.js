const fs = require('fs');

const CONFIG_KEY = 'concurrentMultiTasks';

function validateSubTasksAreFormattedCorrectly(subTasks) {
    const Joi = require('joi');

    const subTaskSchema = Joi.object().keys({
        workingDirectory: Joi.string(),
        command: Joi.string().required(),
        name: Joi.string().required(),
    });

    const subTaskCollectionSchema = Joi.array().items(subTaskSchema);

    const taskConfigSchema = Joi.object().keys({
        subTasks: subTaskCollectionSchema.required(),
        options: Joi.object(), // @see https://www.npmjs.com/package/concurrently#concurrentlycommands-options
    });

    const result = Joi.validate(subTasks, taskConfigSchema);

    if (result.error) {
        throw result.error;
    }
}

exports.getConfigForTask = function(task) {
    const cwd = process.cwd();
    const configPath = `${cwd}/package.json`;
    const configFileExists = fs.existsSync(configPath);

    if (!configFileExists) {
        throw new Error(
            `We extract the configuration from the package.json file and expect it to be available from the directory you run this from (${cwd})`
        );
    }

    const packageJsonContent = require(configPath);

    if (typeof packageJsonContent[CONFIG_KEY] === 'undefined') {
        throw new Error(
            `Expecting there to be a '${CONFIG_KEY}' key in the package.json to extract the configuration from`
        );
    }

    const config = packageJsonContent[CONFIG_KEY];

    if (typeof config[task] === 'undefined') {
        throw new Error(`Missing sub task configuration for '${task}' task`);
    }

    const taskConfig = config[task];

    validateSubTasksAreFormattedCorrectly(taskConfig);

    return taskConfig;
};
