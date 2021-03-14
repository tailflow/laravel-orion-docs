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

Default persisted attributes are `id`, `created_at`, `updated_at`, and `deleted_at`, but you can specify additional ones by overriding the *second* generic in model definition.

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

In some cases you might not want to have one or even all of the default persisted attributes. To accomplish that, simply override the *fourth* generic in the model definition.

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