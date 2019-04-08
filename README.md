# Concurrent multi-task runner

Test setup for using [`concurrently`](https://www.npmjs.com/package/concurrently) with a JSON configuration, to make it more readable and easier to manage. It is used here to setup a project with multiple seperate applications that need to be build, watched etc. at once for convenience.

## From application root..

Install all assets (including that of child applications):

```bash
npm install
```

Build assets:

```bash
npm run build
```

Build assets and watch for changes:

```bash
npm run build:watch
```
