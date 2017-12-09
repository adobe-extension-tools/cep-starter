# cep-starter

This is a "starter kit" for developing CEP panels.
It relies on `cep-bundler` to do the heavy lifting.

The `cep-bundler` does a bunch of things to make your life easier:

- Compile your TypeScript code into a single .js file
- Create the necessary xml files (`CSXS/manifest.xml` and `.debug`) based on your `cep-config.js`
- Create a symlink into the extensions folder so you can test out the extension quickly
- "Live Reloads" the code whenever you save a file for instant updates while developing
- Syncs your `node_modules` (**not** the `devDependencies`) into the bundle
- Syncs "public" files (images, svg's, templates, effects, whatever you like) into the bundle

For a more detailed explaination, see [under the hood](#under-the-hood)

## requirements

**For developing:**

- node.js

**For packaging installers:**

- brew
- makensis

```shell
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install makensis
```

## install

```shell
git clone git@github.com:adobe-extension-tools/cep-starter.git
cd cep-starter
npm install
```

## develop

```shell
npm start
```

Wait for the packager to have started, then open the program you are targetting.
You can find the extension under `Window -> Extensions -> CEP Starter`.
Once opened, look for the debug port (or set it yourself) in the `cep-config.js` and visit `http://localhost:DEBUG_PORT_HERE` in a Chrome browser (it doesn't work in Firefox).
Now click on the blue link and you will be taken to the debugger.
If you are using version CC2017 or older, go to the settings page (little cog icon on the top right) and disable JavaScript sourcemaps, if you don't do this the debugger will crash, this is *not* necessary for CC2018.

Happy coding!

## build & package

```shell
npm run package
```

## under the hood

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
