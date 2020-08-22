# Batch Operations

The following batch operations are supported for both models and relations: store, update, destroy and restore.

## Batch Store

The endpoint expects an object in request payload with `resources` **array**, where each item is an object representing a resource (e.g. a post) to create.

```json
// (POST) https://myapp.com/api/posts/batch
{
    "resources" : [
        {
            "title" : "My Post 1",
            "body" : "Example body text"
        },
         {
            "title" : "My Post 2",
            "body" : "Example body text"
        }
    ]
}
```

## Batch Update

The endpoint expects an object in request payload with `resources` **object**, where each key is a resource id and item is an object representing a resource (e.g. a post) to update.

```json
// (PATCH) https://myapp.com/api/posts/batch
{
    "resources" : {
        "5" : {
            "title" : "My Post 1 (updated)",
            "body" : "Example updated body text"
        },
        "6": {
            "title" : "My Post 2",
            "body" : "Example body text"
        }
    }
}
```

## Batch Delete

The endpoint expects an object in request payload with `resources` array, where each item is an id of resource (e.g. a post) to delete.

```json
// (DELETE) https://myapp.com/api/posts/batch
{
    "resources" : [5,6]
}
```

## Batch Restore

The endpoint expects an object in request payload with `resources` array, where each item is an id of resource (e.g. a post) to restore.

```json
// (POST) https://myapp.com/api/posts/batch/restore
{
    "resources" : [5,6]
}
```