# Includes

Laravel Orion allows the consumers of your API to include relations by two way: post and query params.

### Whitelisting Relations

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The relations that are allowed to be included together with a resource.
    *
    * @return array
    */
    public function includes() : array
    {
        return ['user', 'user.team', 'user.profile', 'meta'];
    }

    ...
}
```

It is also possible to use wildcards to reduce the overhead of defining all possible relations:

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The relations that are allowed to be included together with a resource.
    *
    * @return array
    */
    public function includes() : array
    {
        return ['user.*', 'meta'];
    }

    ...
}
```

### Always Included Relations

To load the relations by default without passing it through the query parameter, use the `alwaysIncludes` method:

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The relations that are loaded by default together with a resource.
    *
    * @return array
    */
    public function alwaysIncludes() : array
    {
        return ['user', 'meta'];
    }

    ...
}
```

::: warning NOTE

Unlike `include` method, the `alwaysIncludes` method does not support wildcards.

:::

## Query params

To instruct the API to return relations via query params, url needs to contain `include` query parameter with a comma separated list of relations.

```bash
(GET) https://myapp.com/api/posts?include=user,meta
```

## Post params

If you want to take advantage of more powerfull includes, you can use post params.

```json
{
  "include": [
    {
      "relation": "comments"
    }
  ]
}
```

## Filtering

You can also specify filters in your queries. These filters supports nested filtering.

```json
{
  "include": [
    {
      "relation": "posts",
      "filters": [
        {"field" : "posts.created_at", "operator" : ">=", "value" : "2020-01-01"}
      ]
    },
    {
      "relation": "posts",
      "filters": [
        {"field" : "posts.created_at", "operator" : ">=", "value" : "2020-01-01"},
        {"nested": [
          {"field": "posts.id", "operator": "=", "value": 1},
          {"field": "posts.id", "operator": ">", "value": 20, "type": "or"}
        ]}
      ]
    }
  ]
}
```

::: warning NOTE

Filters needs to be whitelisted in the "filterableBy" method of your controller.

:::