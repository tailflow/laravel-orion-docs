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
        return ['id', 'title', 'user.id'];
    }

    ...
}
```

To filter results based on one or several attributes, url needs to contain attribute names and values as query parameters.

Note `user.id` - using the ~ notation you can specify fields on relations.

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