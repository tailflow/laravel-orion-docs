# Query Parameters

Laravel Orion allows consumers of your API to use query parameters for working with soft deletable models and including other related resources (defined as relations on a particular model) together in response.

But first, allowed set of relations to be used in query parameters needs to be defined in controller.

## Including Relations

```php

namespace App\Http\Controllers\API;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    ...

    /**
    * The relations that are allowed to be included together with a resource.
    *
    * @return array
    */
    protected function includes()
    {
        return ['user', 'meta'];
    }

    ...
}
```

Sometimes you may want to include relationships together with the returned resources. To do that, url needs to contain `include` query parameter with a comma separated list of relations.

```bash
(GET) https://myapp.com/api/posts?include=user,meta
```

## Soft Deletes

### Returning trashed resources

The `with_trashed` query parameter allows you to return all resources, even the deleted ones.

The `only_trashed` query parameters instructs the API to return only soft deleted resources.

These parameters are accepted on `index`, `search`, and `show` endpoints of both [standard](./models.html#soft-deletes) and [relation](./relationships.html#soft-deletes) resources.

```bash
(GET) https://myapp.com/api/posts?with_trashed
```

### Force deleting

The last, but not least, `force` query parameter allows you to permanently delete a resource. The parameter is accepted on the `destroy` endpoint of both [standard](./models.html#soft-deletes) and [relation](./relationships.html#soft-deletes) resources.

```bash
(DELETE) https://myapp.com/api/posts/5?force
```
