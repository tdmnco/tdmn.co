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
