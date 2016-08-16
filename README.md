#ts-signals
[![Build Status](https://travis-ci.org/mserranom/ts-signals.svg?branch=master)](https://travis-ci.org/mserranom/ts-signals)(https://travis-ci.org/mserranom/container-ts) [![npm version](https://badge.fury.io/js/container-ts.svg)](https://badge.fury.io/js/container-ts)

Signals are a strongly typed, lightweight alternative to events in Typescript.

### NOTE: This project is no longer mantained

## Concept
* A Signal is essentially a mini-dispatcher specific to one event, with its own array of listeners.
* A Signal gives an event a concrete membership in a class.
* Listeners subscribe to real objects, not to string-based channels.
* Signals are inspired by C# events and signals/slots in Qt.

## Example
```typescript
interface Photo {
  name : String;
  url : String;
}		

interface PhotoAlbum {
  thumbnailClick : TypedSignal<Photo>;
}		

interface PhotoFrame {
  show(photo : Photo);
}

// displays a photo in a frame when the thumbnail is clicked
photoAlbum.thumbnailClick.add(photo => photoFrame.show(photo));
