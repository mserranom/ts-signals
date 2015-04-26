ts-signals [![Build Status](https://travis-ci.org/mserranom/ts-signals.png?branch=master)](https://travis-ci.org/mserranom/ts-signals)

ts-signals is a strongly typed alternative to events in Typescript.

## Examples

```typescript

interface Result {
  title : String;
  content : String;
}

interface HTTPRequest {
  error : TypedSignal<Error>;
  success : TypedSignal<Result>
  load(url : String) : void;
}

var request : HTTPRequest = ... ;
request.load("article.json");
request.success.add(result => appendArticle(result));
request.error.add(error => console.warn(error));
```
