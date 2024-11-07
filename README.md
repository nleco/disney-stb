<!-- @format -->

# Disney STB

The code can be found: https://github.com/nleco/disney-stb

# Live Demo

You can find a live demo at: https://samsanchez.me/disney

# Install

The project was created with v21.6.2.

Download the project, go into the directory and run:

```console
$ npm install
$ npm run dev
```

Open a browser to: http://localhost:3000/

# Build

To build the app, run:

```console
$ npm build
```

The app will be found in the `/dist` directory.

# Navigation

The only keys used to navigate are:

- Up/Down Arrows : navigate between each collection vertically.
- Left/Right Arrows: navigate each collection horizontally.
- Enter: Select the selected media.
- Escape: Close the modal.

# Architecture

The idea is to have a page that loads based on the JSON data.

Each collection will load, based on it's type. Currently it only has `Shelf Containers`. We can build and load other types of content rows, such as HERO shots, different lists, etc.

Images are lazy loaded, as well as `SetRefs`.
