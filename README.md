# Cat-utils [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] 
Some tools for building the project.
You can see [here](./src/__tests__) to learn how to use `cat-utils`.

## Getting Started
Install packages using [yarn](https://yarnpkg.com/) (we assume you have pre-installed [npm](https://www.npmjs.com/) and [node.js](https://nodejs.org/)).

```sh
yarn install && yarn build
```

## Usage
- `build`: Build the project. Use this script before you start to write the project.
- `prod`: Set `NODE_ENV=production` and build the project. Use this script when you need to make a production version.
- `watch`: Watch all files. Use this script when you are developing.
- `test`: Run the test.
- You can see other scripts in [package.json](./package.json).

## License
MIT © [HsuTing](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-utils.svg
[npm-url]: https://npmjs.org/package/cat-utils
[travis-image]: https://travis-ci.org/HsuTing/cat-utils.svg?branch=master
[travis-url]: https://travis-ci.org/HsuTing/cat-utils
