# Models

## Attributes

### Defining attributes

Whenever you create a model, its attributes need to be specified in the model definition.

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

### Accessing attributes

Once model is retrieved from the API, its attributes are available via the `$attributes` property on the model object.

```typescript
const post = await Post.$query().find(5);

console.log(post.$attributes.title);
console.log(post.$attributes.body);
```

### Persisted Attributes

As you may have guessed, along with attributes you can also define a so called "persisted attributes". Those attributes are not available on a model at the time of its creation, but they become available only after it is stored in the database, processed, and returned by the API.

Default persisted attributes are `id`, `created_at`, `updated_at`, and `deleted_at`, but you can specify additional ones by overriding the *second* generic parameter in model definition.

```typescript
// post.ts

import {Model} from "@tailflow/laravel-orion/lib/model";

export class Post extends Model<{
    title: string,
    body: string
}, {
    thumbnail_url: string
}>
{
    
}
```

#### Overriding default persisted attributes

In some cases you might not want to have one or even all of the default persisted attributes. To accomplish that, simply override the *fourth* generic parameter in the model definition.

```typescript
// post.ts

import {Model} from "@tailflow/laravel-orion/lib/model";

export class Post extends Model<{
    title: string,
    body: string
}, {
    thumbnail_url: string
}, {}, {
    id: number,
    created_at: string
}>
{
    
}
```

## Primary Key

### Getting and setting primary key value

```typescript
const post = await Post.$query().find(5);

post.$setKey(4);

console.log(post.$getKey()); 
console.log(post.$attributes.id);
```

### Customizing primary key

By default, the `id` attribute is considered model's primary key. However, it is possible to specify a different attribute to use as a primary key.

```typescript
// post.ts

import {Model} from "@tailflow/laravel-orion/lib/model";

export class Post extends Model<{
    slug: string,
    title: string,
    body: string,
}>
{
    protected $keyName: string = 'slug';
}
```

## Operations

### Retrieving a list of resources

```typescript
const posts = await Post.$query().get(); 
```

### Searching for resources

#### Keyword-based search
```typescript
const posts = await Post.$query().lookFor('some value').search(); 
```

#### Scopes
```typescript
const posts = await Post.$query().scope('published', [Date.now()]).search(); 
```

#### Filters
```typescript
const posts = await Post.$query().filter('meta.source_id', '=', 'test-source').search(); 
```

#### Sorting
```typescript
const posts = await Post.$query().sortBy('published_at', SortDirection.Desc).search(); 
```

::: tip TIP
You can chain methods to build complex search queries.
```typescript
const posts = await Post.$query()
    .lookFor('some value')
    .scope('published', [Date.now()])
    .sortBy('published_at', SortDirection.Desc)
    .search(); 
```
:::

### Creating a resource
```typescript
const newPost = await Post.$query().store({
    title: 'New post'
});
```

### Retrieving a resource
```typescript
const post = await Post.$query().find(5);
```

### Updating a resource
```typescript
let post = await Post.$query().find(5);

post.$attributes.title = 'Updated post';
await post.$save();
// or
await post.$save({title: 'Updated post'});
//or
const updatedPost = await Post.$query().update(5, {
   title: 'Updated title'
});
```

### Deleting a resource
```typescript
const deletedPost = await Post.$query().delete(5);
```

#### Force deleting
To force delete a resource, provide a second argument to the delete method.
```typescript
const deletedPost = await Post.$query().delete(5, true);
```