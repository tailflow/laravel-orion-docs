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
        {"field" : "options->visible", "operator" : ">=", "value" : true},
        {"type" : "or", "field" : "meta.source_id", "operator" : "in", "value" : [1,2,3]}
    ],
    "search" : {
        "value" : "Example post"
    },
    "sort" : [
        {"field" : "name", "direction" : "asc"},
        {"field" : "options->key", "direction" : "asc"},
        {"field" : "meta.priority", "direction" : "desc"}
    ]
}
```

::: warning NOTE

Order in which query constraints are be applied does **not** depend on the order of properties in the payload. It is always defined as follows: `scopes` -> `filters` -> `search` -> `sort`.

:::

## Filtering

There are two ways to filter data - query scopes and filters.

It is recommended to use query scopes, because the query constraints are incapsulated in the API (scope method on a model) and no changes to frontend (end-client) would be required, if these constraints change.

Filters, on the other hand, provide a really flexible way of applying query constraints, as if you would do it via Eloquent query builder.

### Applying scopes

First, the list of exposed via API scopes needs to be set on a controller:

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
     * The list of available query scopes.
     *
     * @return array
     */
    protected function exposedScopes() : array
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

If you need granular control over query constraints, using filters might be a better option. Similar to exposing scopes, we need to whitelist fields that can be used in filters:

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The attributes that are used for filtering.
    *
    * @return array
    */
    protected function filterableBy() : array
    {
        return ['id', 'title', 'options->visible', 'user.id', 'meta.source_id', 'created_at'];
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
        {"field" : "options->visible", "operator" : ">=", "value" : true},
        {"type" : "or", "field" : "meta.source_id", "operator" : "in", "value" : [1,2,3]}
    ]
}
```

As you can see from the example above, each filter descriptor is composed of the following properties: `type` (optional), `field`, `operator`, and `value`.

The `field` property value is simply one of the whitelisted attributes.

The `type` (default is `and`) property serves as a logical operator for combining multiple filters and can be either `and` or `or`. Under the hood it defines whether to use `where` or `orWhere` method on query builder for applying a filter.

The `operator` property must be one of the supported comparison operations: `<`, `<=`, `>`, `>=`, `=`, `!=`, `like`, `not like`, `ilike`, `not ilike`, `in`, `not in`. These operators are exactly the same operators you would usually pass to `->where('<some field>', '<operator>', '<value>')` calls on Eloquent [query builder](https://laravel.com/docs/queries).

The Last, but not least `value` - the actual value an attribute must have to satisfy the specified comparison conditions.

::: tip TIP

You can filter results based on the attributes of relations simply by whitelisting them alongside other attributes using dot notation.
In the example above `user.id` and `meta.source_id` are one of such attributes.

Many-to-many relation resources can also be filtered by their pivot values. Just use `pivot.<field>` notation, where `<field>` is a field on the pivot table.

It is also possible to filter results based on the values inside json fields by whitelisting them alongside other attributes using "arrow" notation.
In the example above `options->visible` is one of such attributes.
:::

## Keyword Search

This type of search is something you would normally do, for example, as a search input functionality on your website to find all blog posts that have a phrase "Laravel is awesome" in it.
First, you need to define the list of fields across which the search will be performed:

::: warning ATTENTION
The search is **case-sensitive** by default. You can change this behavior by settings `search.case-sensitive` to `false` in `orion.php` config.
:::

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
     * The attributes that are used for searching.
     *
     * @return array
     */
    protected function searchableBy() : array
    {
        return ['title', 'description', 'options->key', 'user.name'];
    }

    ...
}
```

In the request to a search endpoint include `search` property:

```json
// (POST) https://myapp.com/api/posts/search
{
     "search" : {
        "value" : "Laravel is awesome",
        "case_sensitive": false // (default: true)
    },
}
```

::: tip TIP

You can perform case-insensitive search by providing `case_sensitive: false` field in the request, even when `search.case-sensitive` is set to `true` in `orion.php` config.
:::

At the moment, the search is performed using database query on **all** of the specified fields. 

Support for [Algolia](https://www.algolia.com/) and [ElasticSearch](https://www.elastic.co/products/elasticsearch) is also planned :wink:

::: tip TIP

You can perform search on the attributes of relations simply by whitelisting them alongside other attributes using dot notation.
In the example above `user.name` is one of such attributes.

It is also possible to perform search on the values inside json fields by whitelisting them alongside other attributes using "arrow" notation.
In the example above `options->key` is one of such attributes.
:::

## Sorting

Similar to the way fields are whitelisted for filters, they need to be specified for sorting as well:

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
     * The attributes that are used for sorting.
     *
     * @return array
     */
    protected function sortableBy() : array
    {
         return ['id', 'name', 'options->key', 'meta.priority'];
    }

    ...
}
```

In the request to a search endpoint include `search` property:

```json
// (POST) https://myapp.com/api/posts/search
{
    "sort" : [
        {"field" : "name", "direction" : "asc"},
        {"field" : "options->key", "direction" : "asc"},
        {"field" : "meta.priority", "direction" : "desc"}
    ]
}
```

Each sort descriptor is composed of the following properties: `field` and `direction`.

The `field` property value is simply one of the whitelisted attributes and `direction` is either `asc` or `desc`.

::: tip TIP

You can sort results based on the attributes of relations simply by whitelisting them alongside other attributes using dot notation.
In the example above `meta.priority` is one of such attributes.

Many-to-many relation resources can also be sorted by their pivot values. Just use `pivot.<field>` notation, where `<field>` is a field on the pivot table.

It is also possible to sort results based on the values inside json fields by whitelisting them alongside other attributes using "arrow" notation.
In the example above `options->key` is one of such attributes.
:::
