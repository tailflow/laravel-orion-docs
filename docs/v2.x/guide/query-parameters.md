# Query Parameters

Laravel Orion allows consumers of your API to use query parameters for working with soft deletable models and interacts with pagination in response.

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
