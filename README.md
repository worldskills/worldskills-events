# WorldSkills Events

[![Greenkeeper badge](https://badges.greenkeeper.io/worldskills/worldskills-events.svg)](https://greenkeeper.io/)

## Installation

```
git clone git@github.com:worldskills/worldskills-events.git
cd worldskills-events
npm install -g grunt-cli
npm install
webdriver-manager update
./node_modules/bower/bin/bower install
cp app/scripts/config.js.dev app/scripts/config.js
```

## Development

Run local development server for [http://localhost:10400](http://localhost:10400/):

```
grunt server
```

## Documentation

To generate the documentation install [Pandoc](http://johnmacfarlane.net/pandoc/) and run:

```
cd docs
pandoc --toc index.md -oworldskills-events.pdf
open worldskills-events.pdf
```

## Tests

```
npm test
grunt server
npm run protractor
```
