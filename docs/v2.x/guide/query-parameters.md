# Query Parameters

Laravel Orion allows consumers of your API to use query parameters for interaction with soft deletable resources, including other related resources (defined as relations on a particular model) together in response, aggregating relations and/or fields, and specifying how many resources to return in response (pagination limit).

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

Value specified in the `limit` query parameter *always* overwrites the value specified in the `limit` method on a controller, but it can never exceed the value specified in the `maxLimit` method.

:::


## Max Pagination Limit

By default, there is no limit on how many entities could be requested from API. To customize that, use `maxLimit` method:

```php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * Max pagination limit.
    *
    * @return int
    */
    public function maxLimit() : int
    {
        return 100;
    }

    ...
}
```

## Aggregating

First, relations and fields used for aggregation need to be [whitelisted](./search.html#aggregates).

To instruct the API to return aggregates, url needs to contain a specific query parameter with a comma separated list of relations or fields.

```bash
(GET) https://myapp.com/api/posts?with_count=user,meta
(GET) https://myapp.com/api/posts?with_exists=user,meta
(GET) https://myapp.com/api/users?with_avg=posts.stars
(GET) https://myapp.com/api/users?with_sum=posts.stars
(GET) https://myapp.com/api/users?with_min=posts.stars
(GET) https://myapp.com/api/users?with_max=posts.stars
```


## Including Relations

First, relations need to be [whitelisted](./search.html#includes).

To instruct the API to return relations, url needs to contain `include` query parameter with a comma separated list of relations.

```bash
(GET) https://myapp.com/api/posts?include=user,meta
```
