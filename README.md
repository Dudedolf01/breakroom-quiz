# Breakroom Survey Answers

As per requirement this script will read a file from the file system, parse its contents and output a score.

# Running

## Calculating the scores

To run the script use

```
npm start
```

this will read in the `answers.json` file

Alternatively run to customise the input file

```
node src\index.js [filename.json]
```

## Running tests

I have used vitest for the test runner as it works better the es modules. To run these use

```
npm test
```

this will run the test in watch mode

# To Do

I would have liked to have done the following:

- Add a validator for the answers file so it can check that the response for a question are of the correct type, the [AJV](https://ajv.js.org/) package could be useful here
- Check/handle edge cases e.g. YES, yes, Yes for should all probably be handled
- More robust error checking, but AJV could help with this
- Move the reading of the file and console.log to the index.js file, so that `generate-score.js` would be a pure function and more testable
