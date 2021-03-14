# Getting Started

## Installation

Laravel Orion can be installed into a new or existing project, simply by adding a composer dependency:

**Using NPM**
```bash
npm install @tailflow/laravel-orion --save
```

**Using Yarn**
```bash
yarn add @tailflow/laravel-orion
```

## Configuration

Once the package is installed, the next step is configure (or *initialize*) it to work with your API.

```typescript
import {Orion} from "@tailflow/laravel-orion/lib/orion";

Orion.init('https://your-api.test');
Orion.setToken('access-token-here');
```
That's it! Now let's move on to the model setup.

## Setting up a model

Let's create our first model and query the API. Pick any model that you have in your Laravel API - I will go with `Post` model, just as an example.

Add a class `Post` in your TypeScript app and extend it from `Model`.

```typescript
// post.ts

import {Model} from "@tailflow/laravel-orion/lib/model";

export class Post extends Model
{
    
}
```

Next, define attributes of the model

```typescript
// post.ts

import {Model} from "@tailflow/laravel-orion/lib/model";

export class Post extends Model<{
    title: string,
    body: string
}>
{
    
}
```

::: tip TIP
You do not need to define the `id`, `created_at`, and `updated_at` attributes - SDK does that for you automatically.
:::

Congratulations, you now have successfully set up the model, and everything is ready to query the API 🎉

## Querying the API

Laravel Orion TypeScript SDK makes it incredibly easy to consume your API.

```typescript
// somewhere in your app

import {Post} from '../post.ts';

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
//or
const updatedPost = await Post.$query().update(5, {
   title: 'Updated title' // <-- and, of course, here
});

// delete a post
const deletedPost = await Post.$query().delete(5);
```