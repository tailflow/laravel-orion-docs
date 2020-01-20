# Search

Laravel Orion provides comprehensive search capabilities for your API endpoints with sorting, filtering and keyword search.

```json
// (POST) https://myapp.com/api/posts/search
{
    "scopes" : [
        {"name" : "active"},
        {"name" : "whereCategory", "parameters" : ["my-category"]}
    ],
    "filters" : [
        {"field" : "created_at", "operator" : ">=", "value" : "2020-01-01"},
        {"type" : "or", "field" : "meta.source_id", "operator" : "in", "value" : [1,2,3]}
    ],
     "search" : {
        "value" : "Example post"
    },
    "sort" : [
        {"field" : "name", "direction" : "asc"},
        {"field" : "meta.priority", "direction" : "desc"}
    ]
}
```

::: warning NOTE

Order in which query constraints are be applied does **not** depend on the order of properties in the payload. It is always defined as follows: `scopes` -> `filters` -> `search` -> `sort`.

:::

## Filtering

There are two ways to filter data - query scopes and filters.

### Applying scopes

First, the list of exposed via API scopes needs to be set on a controller:

```php

namespace App\Http\Controllers\API;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
     * The list of available query scopes.
     *
     * @return array
     */
    protected function exposedScopes()
    {
        return ['active', 'whereCategory'];
    }

    ...
}
```

To actually filter the data using one or several scopes, make a request to a search endpoint and include `scopes` property with scope `name` and its `parameters` in the payload:

```json
// (POST) https://myapp.com/api/posts/search
{
    "scopes" : [
        {"name" : "active"},
        {"name" : "whereCategory", "parameters" : ["my-category"]}
    ],
}
```

### Applying filters

Similar to exposing scopes, we need to whitelist fields that can be used in filters:

```php

namespace App\Http\Controllers\API;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The attributes that are used for filtering.
    *
    * @return array
    */
    protected function filterableBy()
    {
        return ['id', 'title', 'user.id', 'meta.source_id', 'created_at'];
    }

    ...
}
```

In the request to a search endpoint include `filters` property:

```json
// (POST) https://myapp.com/api/posts/search
{
    "filters" : [
        {"field" : "created_at", "operator" : ">=", "value" : "2020-01-01"},
        {"type" : "or", "field" : "meta.source_id", "operator" : "in", "value" : [1,2,3]}
    ]
}
```

As you can see from the example above, each filter is composed of the following properties; `type` (optional), `field`, `operator`, and `value`.

The `field` property value is simply one of the whitelisted attributes.

The `type` (default is `and`) property serves as a logical operator for combining multiple filters and can be either `and` or `or`. Under the hood it defines whether to use `where` or `orWhere` method on query builder for applying a filter.

The `operator` property must be is one of the supported comparison operations: `<`, `<=`, `>`, `>=`, `=`, `!=`, `like`, `not like`, `in`, `not in`. These operators are exactly the same operators you would usually pass to `->where('<some field>', '<operator>', '<value>')` calls on Eloquent query builder.

Last, but not least `value` - the actual value an attribute must have to satisfy the specified comparison conditions.

::: tip TIP

You can filter on attributes of relations simply by whitelisting them alongside other attributes using dot notation.
In the example above `user.id` and `meta.source_id` are one of such attributes.

:::

## Keyword Search

```php

namespace App\Http\Controllers\API;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
     * The attributes that are used for searching.
     *
     * @return array
     */
    protected function searchableBy()
    {
        return ['title', 'description', 'user.name'];
    }

    ...
}
```

To search across resources, url needs to contain `q` query parameter. API will search in ALL of the defined in `searchableBy` method attributes.

## Sorting

```php

namespace App\Http\Controllers\API;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
     * The attributes that are used for sorting.
     *
     * @return array
     */
    protected function sortableBy()
    {
         return ['id', 'title', 'created_at', 'user.name'];
    }

    ...
}
```