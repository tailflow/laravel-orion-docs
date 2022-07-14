# Query Parameters

Laravel Orion allows consumers of your API to use query parameters for working with soft deletable models and including other related resources (defined as relations on a particular model) together in response.

## Including Relations

Sometimes you may want to include relationships together with the returned resources. First, allowed set of relations to be used in query parameters needs to be defined on a controller.

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

To instruct the API to return relations, url needs to contain `include` query parameter with a comma separated list of relations.

```bash
(GET) https://myapp.com/api/posts?include=user,meta
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

## Soft Deletes

### Returning trashed resources

The `with_trashed` query parameter allows you to return all resources, even the deleted ones.

The `only_trashed` query parameters instructs the API to return only soft deleted resources.

These parameters are accepted on `index`, `search`, and `show` endpoints of both [standard](./models.html#soft-deletes) and [relation](./relationships.html#soft-deletes) resources.

```bash
(GET) https://myapp.com/api/posts?with_trashed=true
```

### Force deleting

The last, but not least, `force` query parameter allows you to permanently delete a resource. The parameter is accepted on the `destroy` endpoint of both [standard](./models.html#soft-deletes) and [relation](./relationships.html#soft-deletes) resources.

```bash
(DELETE) https://myapp.com/api/posts/5?force=true
```

## Pagination Limit

By default, 15 entities are returned per page from the `index` or `search` endpoints. To customize that, use `limit` method:

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * Default pagination limit.
    *
    * @return int
    */
    public function limit() : int
    {
        return 20;
    }

    ...
}
```

To instruct the API to return a specific number of entities per page, url needs to contain `limit` query parameter.

```bash
(GET) https://myapp.com/api/posts?limit=30
```

::: warning NOTE

Value specified in the `limit` query parameter *always* overwrites the value specified in the `limit` method on a controller.

:::
