# Introduction

## Features

- Models with typed [attributes](/v1.x/guide/typescript-sdk/models.html#attributes) and [relationships](/v1.x/guide/typescript-sdk/relationships.html#definition)
- Support of all API operations on [model](/guide/models.html) and [relationship](/guide/relationships.html) resources
- Extensive [search queries](/v1.x/guide/typescript-sdk/models.html#searching-for-resources)
- [CSRF cookie fetching](/v1.x/guide/typescript-sdk/configuration.html#integration-with-sanctum-for-spa) for seamless integration with [Sanctum](https://laravel.com/docs/master/sanctum#spa-authenticating)

## How It Works

Define a model with typed attributes, set resource name, configure API url, and that's it - everything is ready to work with the API ✨

```typescript
import {Orion} from "@tailflow/laravel-orion/lib/orion";
import {Model} from "@tailflow/laravel-orion/lib/model";

Orion.init('https://your-api.test');
Orion.setToken('access-token-here');

export class Post extends Model<{
    title: string,
    body: string
}>
{
    public $resource(): string {
        return 'posts';
    }
}

// retrieve a list of posts
const posts = await Post.$query().get();

// search for posts
const posts = await Post.$query().lookFor('some value').search();

// create a post
const newPost = await Post.$query().store({
    title: 'New post' // <-- you get a nice autocompletion here, because the attributes are typed 
});
console.log(newPost.$attributes.title);  // <-- oh, and here as well

// retrieve a post
const post = await Post.$query().find(5);

// update a post
post.$attributes.title = 'Updated post';
await post.$save();
// or
await post.$save({title: 'Updated post'}); // <-- and here
// or
const updatedPost = await Post.$query().update(5, {
    title: 'Updated title' // <-- and, of course, here
});

// delete a post
const deletedPost = await Post.$query().delete(5);
// or
await post.$destroy();

// and more: search, relantionship operations, etc.
```

Ready to dive deeper? Head to the [Getting Started](/v1.x/guide/typescript-sdk/getting-started.html) section and start building.
