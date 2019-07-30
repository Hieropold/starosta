# Starosta

The blast from the past.

## Environment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `npx ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `npx ng generate component component-name` to generate a new component. You can also use `npx ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build docker container for deployment

Run script build-docker.sh. It will compile the app into dist folder, copy Dockerfile and nginx config there, and build
a Docker image.

## Running unit tests

Run `npx ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npx ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## notes

sounds - https://howlerjs.com/

## TODOs

* Animation very frequently are displayed with 1px offset, not nice.
* Dialog phrases should be coloured into different colours, like in original.
* Dialog phrases should be displayed with "typing" animation, like in original.
* Background music on Near Litmo scene is missing.
* Cursor is not displayed correctly - should be large yellow arrow.
* Dossiers should be displayed with "typing" animation and sound, like in original.
* Inventory should display information about items in tooltips.
* Add info about inventory to all screens, e.g. hint in top right corner.
* Hall: add fountain animation.
