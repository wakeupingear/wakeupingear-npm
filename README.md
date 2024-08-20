# WakeUpInGear's Lovely TypeScript Packages

This is a big collection of helper TypeScript code that I've found useful across different projects. How fun!

A lot of these could be replaced by more proven NPM packages (ex: universal button components) BUT there's a very specific subset of patterns that I care about, some of which aren't used by other libraries. 

Plus these libraries are SMALL with minimal dependencies. Very nice for making lightweight apps.

## Highlights

The ones that I think are more interesting

### React

* `<Transition/>` - a transition wrapper
* `<Expandable/>` - a container to smoothly animate an element expanding
* `<InputRow>` - a single-input form with animations and built in props for submission, suspense, and error states

### Utils

* `ExternalSite` - a union type representing most major social sites; metadata included
   * Logos available in the React package

## Doc Generation

I fell down the rabbit hole of the TypeScript compiler and ended up throwing together a simple docs generator. [This is a simple script](./scripts/generate-readme.ts) that uses TypeScipt's internal reflection functions to find all the exports of the main packages, grab all JSDoc annotations, and format them into each package's respective README.

Overkill? Yes, but it was easy and fun :)

## Should You Use This?

IDK. It's mostly for me, but if anyone else finds it useful, cool! Highly suggest checking out the `packages/` directory to see specific features.