// Imports:
import { Model } from 'tdmnco-model-js'

// Classes:
class Post extends Model {
  constructor(data) {
    super(data, {
      endpoint: '',
      modelName: 'Post'
    })
  }
}

// Prototyping:
Post.prototype.modelName = 'Post'

// Exports:
export { Post }

/*
let _counter = new WeakMap();
let _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter)
    _action.set(this, action)
  }

  suppe() {
    _counter.set(this, 60)

    console.log(_counter.get(this))
  }
}

let countdown = new Countdown()

countdown.suppe()

let jazz = JSON.stringify(countdown)

console.log(jazz)
*/
