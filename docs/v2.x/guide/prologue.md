# Prologue

## Release Notes

### OpenAPI specifications generation

Now you can generate OpenAPI specifications automatically for all Orion-powered endpoints, simply by running the following command:

```bash
php artisan orion:specs
```

You can learn more about this feature in the [Specifications](./specifications.html) section of this guide.

### JSON fields search

2.0 release enables even greater search capabilities by introducing the support for json fields.

```json
// (POST) https://myapp.com/api/posts/search
{
    "filters" : [
        {"field" : "options->visible", "operator" : ">=", "value" : true},
    ],
    "search" : {
        "value" : "Example post"
    },
    "sort" : [
        {"field" : "options->key", "direction" : "asc"},
    ]
}
```

To whitelist a field inside a json field, use arrow notation:

```php
namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

// options field here is a json/jsonb field of the Post model
// visible and key fields are fields inside that json/jsonb field 
class PostsController extends Controller
{ 
    protected function filterableBy() : array
    {
        return ['options->visible'];
    }

    protected function searchableBy() : array
    {
        return [ 'options->key'];
    }
    
    protected function sortableBy() : array
    {
         return ['options->key'];
    }
}
```

### Nested relations search

Previously, it was possible to search on relation fields one-level deep only, e.g.:

```php
public function searchableBy() : array
{
    return ['user.name']; // name field of the user relation
}
```

This release makes it possible to perform search on deeply nested relations:

```php
public function searchableBy() : array
{
    return ['user.name', 'user.location.address.postalcode']; // postalcode field of the deeply nested user.location.address relation
}
```

### Hook methods signature

A parent entity is now passed into the hook methods of relationship controllers, e.g.:

```php
protected function afterSave(Request $request, Model $parentEntity, Model $entity)
```

### Default auth guard resolution

The default auth guard is now resolved from the `orion.php` config's `auth.guard` key.

You can still override the `resolveUser` method on a controller, if you need a granular control over the auth guard or user resolution.

### `ilike` and `not ilike` operators support

```json
// (POST) https://myapp.com/api/posts/search
{
    "filters" : [
        {"field" : "title", "operator" : "ilike", "value" : "example post"},
    ]
}
```

## Upgrade Guide

This guide covers the process of upgrading Laravel Orion from v1.x to v2.x.

### PHP 7.3 required

The new minimum PHP version is now 7.3.0.

### Updating dependencies

Update the following dependencies in your `composer.json` file:

- `php` to `>=7.3`
- `tailflow/laravel-orion` to `^2.0`

### Publishing config

The release introduces `orion.php` config file, allowing you to customize the default auth driver and information about api for specifications generation.

To publish the config, run the following command:

```bash
php artisan vendor:publish --tag=orion-config
```

### Whitelisting methods signature

The following methods have been made `public`:

- `exposedScopes`
- `filterableBy`
- `searchableBy`
- `sortableBy`
- `includes`
- `alwaysIncludes`

Please update your controllers accordingly, should you have any of these methods overridden.

### Hook methods signature

Starting with 2.0 release, a parent entity is passed into the hook methods. Please update your *relationship* controllers accordingly, should you have any hook methods overridden.

Here is an example:

**Before 2.0**

```php
protected function afterSave(Request $request, Model $entity)
```

**After 2.0**

```php
protected function afterSave(Request $request, Model $parentEntity, Model $entity)
```
