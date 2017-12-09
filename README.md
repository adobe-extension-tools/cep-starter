# Starter Kit for building CEP extensions

This is a "starter kit" for developing CEP panels.
It relies on `cep-bundler` to do the heavy lifting.

The `cep-bundler` does a bunch of things to make your life easier:

- Compile your [TypeScript](http://www.typescriptlang.org) code into a single `.js` file
- Create the necessary xml files ([CSXS/manifest.xml](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#extension-manifest) and [.debug](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#remote-debugging)) based on your `cep-config.js`
- Create a symlink into the extensions folder so you can test out the extension quickly
- "Live Reloads" the code whenever you save a file for instant updates while developing
- Syncs your `node_modules` (**not** the `devDependencies`) into the bundle
- Syncs "public" files (images, svg's, templates, effects, whatever you like) into the bundle

For a more detailed explaination, see [under the hood](#under-the-hood)

# Topics

- [Requirements](#requirements)
- [Installing](#installing)
- [Developing](#developing)
- [Building and Packaging](#building-and-packaging)
- [How to](#how-to)
  - [Use a node module](#use-a-node-module)
  - [Add a stylesheet](#add-a-stylesheet)
  - [Change the html template](#change-the-html-template)
- [Under the hood](#under-the-hood)

# Requirements

**For developing:**

- node.js

**For creating installers:**

- brew
- makensis

```shell
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install makensis
```

# Installing

```shell
git clone git@github.com:adobe-extension-tools/cep-starter.git
cd cep-starter
npm install
```

# Developing

```shell
npm start
```

Wait for the packager to have started, then open the program you are targetting.
You can find the extension under `Window -> Extensions -> CEP Starter`.
Once opened, look for the debug port (or set it yourself) in the `cep-config.js` and visit `http://localhost:DEBUG_PORT_HERE` in a Chrome browser (it doesn't work in Firefox).
Now click on the blue link and you will be taken to the debugger.
If you are using version CC2017 or older, go to the settings page (little cog icon on the top right) and disable JavaScript sourcemaps, if you don't do this the debugger will crash, this is *not* necessary for CC2018.

Happy coding!

# Building and Packaging

```shell
npm run package
```

# How To

This tool makes a lot of things easier, but some things are a bit strange.  
The strange things are explained below, hopefully it makes sense.

## Use a node module

// todo: write why we have to require node modules in this strange way

```ts
import { nodeRequire } from './utils'

const rimraf = nodeRequire('rimraf')
```

## Add a stylesheet

You can put any kind of file in the `assets` folder and it will be put into the `build` folder.
This way, when `browserify` is putting your bundle together, you have access to the files in there.
Don't use the `import ... from ...` syntax, TypeScript will trip over this (only supports loading .ts or .js files)
However, you can still use the require syntax, as shown below.
Just make sure you have a browserify transform configured that transform (in this example) the .scss into a css string.

```ts
const style = require('./assets/style/style.scss')
loadStyle(style)

function loadStyle(style: string) {
  let styleEl = document.getElementById('style')
  if (!styleEl) {
    const newStyle: HTMLStyleElement = document.createElement('style')
    newStyle.id = 'style'
    newStyle.type = 'text/css'
    newStyle.innerHTML = style
    document.body.appendChild(newStyle)
    styleEl = newStyle
  }
}
```

To add a transform to browserify, add the following section to your `cep-config.js`

```js
module.exports = {
  bundler: {
    // ...cut...
    browserify: {
      js: {
        transform: [
          require('sassify')
        ]
      }
    }
    // ...cut...
  }
}
```

And make sure to install the sassify transform

```shell
npm install --save-dev sassify
```

## Change the html template

You can add a `htmlTemplate` key to you `cep-config.js` that should have a `Function` as it's value.
You can use the "core" html template as an example which can be found [here](https://github.com/adobe-extension-tools/cep-bundler/blob/master/src/templates/html.ts)

Make sure to leave the `<script>` tags in there!

# Under the hood

When you run `npm run build` the following things happen:

| **action**           | **description**                                                           |
|----------------------|---------------------------------------------------------------------------|
| createHtml           | Creates the `$BUNDLE/index.html` file from the html template              |
| createManifest       | Creates the `$BUNDLE/CSXS/manifest.xml` from the `cep-config.js` settings |
| createDebug          | Creates the `$BUNDLE/.debug` file from the `cep-config.js` settings       |
| typescriptCompileJs  | Compiles `src/js/**.ts` into `build/js/**.js`                             |
| typescriptCompileJsx | Compiles `src/jsx/**.ts` into `build/jsx/**.js`                           |
| copyAssets           | Copies `src/assets/**` into `build/assets/**`                             |
| copyPublic           | Copies `public` into `$BUNDLE`                                            |
| copyNodeModules      | Copies the "production" `node_modules` into `$BUNDLE/node_modules`        |
| browserifyBundleJs   | Compiles `build/js/**.js` into `$BUNDLE/index.js`                         |
| browserifyBundeJsx   | Compiles `build/jsx/**.js` into `$BUNDLE/index.jsx`                       |


When you run `npm start` the following things happen:

| **action**           | **description**                                                                       |
|----------------------|---------------------------------------------------------------------------------------|
| createHtml           | Creates the `$BUNDLE/index.html` file from the html template                          |
| createManifest       | Creates the `$BUNDLE/CSXS/manifest.xml` from the `cep-config.js` settings             |
| createDebug          | Creates the `$BUNDLE/.debug` file from the `cep-config.js` settings                   |
| typescriptCompileJs  | Compiles `src/js/**.ts` into `build/js/**.js`                                         |
| typescriptCompileJsx | Compiles `src/jsx/**.ts` into `build/jsx/**.js`                                       |
| copyAssets           | Copies `src/assets/**` into `build/assets/**`                                         |
| copyPublic           | Copies `public` into `$BUNDLE`                                                        |
| copyNodeModules      | Copies the "production" `node_modules` into `$BUNDLE/node_modules`                    |
| browserifyBundleJs   | Compiles `build/js/**.js` into `$BUNDLE/index.js`                                     |
| browserifyBundeJsx   | Compiles `build/jsx/**.js` into `$BUNDLE/index.jsx`                                   |
| symlink              | Symlinks `bundle` into `/Library/Application Support/Adobe/CEP/extensions/$BUNDLE_ID` |
| typescriptWatchJs    | Compiles `src/js/**.ts` into `build/js/**.js` and watches for changes                 |
| typescriptWatchJsx   | Compiles `src/jsx/**.ts` into `build/jsx/**.js` and watches for changes               |
| browserifyWatchJsx   | Compiles `build/js/**.js` into `$BUNDLE/index.jsx`, watches for changes, live reloads |
| browserifyWatchJs    | Compiles `build/jsx/**.js` into `$BUNDLE/index.js`, watches for changes, live reloads |
