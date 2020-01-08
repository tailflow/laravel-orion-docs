# Query Parameters

Laravel Orion allows consumers of your API to use query parameters for working with soft deletable models and including other related resources (defined as relations on a particular model) together in response.

But first, allowed set of relations to be used in query parameters needs to be defined in controller.

## Including Relations

```php

namespace App\Http\Controllers\API;

use Laralord\Orion\Http\Controllers\Controller;

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
        return ['user'];
    }

    ...
}
```

Sometimes you may want to include relationships together with the returned resources. To do that, url needs to contain `include` query parameter with a comma separated list of relations.

**Pattern:** `https://<app url>/api/<resource>?include=<relation a>,<relation b>...`

**Example:** `https://<app url>/api/posts?include=user`

## Soft Deletes

There are 3 query parameters available - `with_trashed`, `only_trashed`, and `force`.

The first two allow you to include either all resources, even the deleted ones - `with_trashed` or only the deleted ones - `only_trashed`. These parameters are accepted on `index` and `search` endpoints of both [standard](./models.html#soft-deletes) and [relation](./relationships.html#soft-deletes) resources.

The last, but not least, parameter `force` allows you to permanently delete a resource. The parameter is accepted on the `destroy` endpoint.
