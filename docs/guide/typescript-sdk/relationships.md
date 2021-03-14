# Relationships

Defining relationships is similar to the way of defining model attributes, however, there are some differences. Let's
take a look at the example below.

## Definition

```typescript
// post.ts

import {Model} from "@tailflow/laravel-orion/lib/model";
import {BelongsTo} from "@tailflow/laravel-orion/lib/drivers/default/relations/belongsTo";
import {HasMany} from "@tailflow/laravel-orion/lib/drivers/default/relations/hasMany";
import {User} from "./user";
import {Comment} from "./comment";

export class Post extends Model<{
    title: string,
    body: string
}, {
    thumbnail_url: string
}, {
    user: User,
    comments: Array<Comment>
}> {
    public user(): BelongsTo<User> {
        return new BelongsTo(User, this);
    }

    public comments(): HasMany<Comment> {
        return new HasMany(Comment, this);
    }
}
```

1. Provide a *third* generic parameter in the model definition with a list of relations and their model types.
2. Create a method for each property (relation) and return a new instance of relation query builder specific to the
   relation type and model.

TypeScript SDK supports *all* relationship types ✨

## CRUD and Search

Performing CRUD and search operations on relation resources is basically the same as on
the [model resources](/guide/typescript-sdk/models.html#operations).

To obtain a query builder instance specific to relation resource, simply call the relation method on a model instance.

```typescript
const post = Post.$query().find(5);

const comments = post.comments().get(); // retrieves a list of comments for post with id 5
const newComment = post.comments().store({body: 'Test comment'});
// etc.
```

## One to Many

### Associating resources

```typescript
const post = Post.$query().find(5);

post.comments().associate(7);
```

### Dissociating resources

```typescript
const post = Post.$query().find(5);

post.comments().dissociate(7);
```

## Many to Many

### Attaching resources

```typescript
const post = Post.$query().find(5);

post.tags().attach([2, 5, 7]);
// or
post.tags().attachWithFields({
    2: {pivot_field: 'test value'},
    5: {pivot_field: 'another value'},
    7: {}
});
```

**Attaching with duplicates**

By default, the `duplicates` query parameter is set to `false`, but you can instruct the SDK to set it to `true` by providing the second argument to the `attach` or `attachWithFields` method.

```typescript
const post = Post.$query().find(5);

post.tags().attach([2, 5, 7], true);
```

### Detaching resources

```typescript
const post = Post.$query().find(5);

post.tags().detach([2, 5, 7]);
// or
post.tags().detachWithFields({
    2: {pivot_field: 'test value'},
    5: {pivot_field: 'another value'},
    7: {}
});
```

### Syncing resources

```typescript
const post = Post.$query().find(5);

post.tags().sync([2, 5, 7]);
// or
post.tags().syncWithFields({
    2: {pivot_field: 'test value'},
    5: {pivot_field: 'another value'},
    7: {}
});
```

**Syncing without detaching**

By default, the `detaching` query parameter is set to `true`, but you can instruct the SDK to set it to `false` by providing the second argument to the `sync` or `syncWithFields` method.

```typescript
const post = Post.$query().find(5);

post.tags().sync([2, 5, 7], false);
```

### Toggling resources

```typescript
const post = Post.$query().find(5);

post.tags().toggle([2, 5, 7]);
// or
post.tags().toggleWithFields({
    2: {pivot_field: 'test value'},
    5: {pivot_field: 'another value'},
    7: {}
});
```

### Updating pivot

```typescript
const post = Post.$query().find(5);

post.tags().updatePivot(2, {pivot_field: 'test value'});
post.tags().updatePivot(5, {pivot_field: 'test value'});
post.tags().updatePivot(7, {pivot_field: 'test value'});
```