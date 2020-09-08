# Sample plugin for Adobe XD using Angular

## Build
Before build don't forget to install packages using.
```
npm i
```
And to build the plugin run following command in the root folder:
```
npm run build -- --prod --extra-webpack-config webpack.extra.js --output-hashing=none
```
You will get output in the `dist`  folder. Specifically you will see 3 folders inside:
- `artifacts` contains ready to install plugin with \*.xdx extension
- `package` contains compiled plugin source code. Really xdx is just zipped `package` folder. It contains of compiled angular part plus XD entrypoints and metadata. You can find more details about it on [Adobe XD Platform Develop guide](https://adobexdplatform.com/plugin-docs/develop.html)
- `sample-plugin` (folder name might be different) contains compiled angular code.

## Questions
If you have any questions fill free to ask them on [official form](https://forums.adobexdplatform.com/t/xd-plugin-using-angular/816/12).

## Working example
You can check working example built using Angular on XD Marketplace, e.g. Sympli Handoff plugin https://xd.adobelanding.com/en/xd-plugin-download/?name=108997b7

## Notes
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.