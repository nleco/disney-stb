<!-- @format -->

# Disney STB

The code can be found: https://github.com/nleco/disney-stb

# Live Demo

You can find a live demo at: https://samsanchez.me/disney

# Install

The project was created with v21.6.2.

Download the project, go into the directory and run:
npm install
npm run dev

Open a browser to: http://localhost:3000/

# Navigation

The only keys used to navigate are:

- Up/Down arrows : navigate between each collection vertically.
- Left/Right arrows: navigate each collection horizontally.
- Enter: Select the selected media.
- Escape: close the modal.

# Architecture

The idea is to have a page that loads based on the JSON data.

Each collection will load, based on it's type. Currently it only has `Shelf Containers`. We can build and load other types of content rows, such as HERO shots, different lists, etc.

Images are lazy loaded, as well as `SetRefs`.
