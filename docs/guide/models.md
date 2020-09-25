# Models

## Setting up Controller

To expose a model through API, first you need to create a controller for it. As you may have seen in the [Getting Started - Simple CRUD](./getting-started.html#simple-crud) section, defining a model controller is pretty straightforward.

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"
}
```

::: warning KEY TAKEAWAYS

* Model controllers always extend `Orion\Http\Controllers\Controller`
* `$model` property is set to a fully qualified model class name

:::

## Setting up Routes

Once controller is created, it is the time to register routes.

```php
<?php

use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::resource('posts', 'Api\PostsController');
    ...
});

```

Essentially, `Orion::resource` method is the same as Laravel's default `Route::apiResource` - it will create multiple routes to handle a variety of actions on the resource.

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
...
|        | GET|HEAD  | api/posts                                       | api.posts.index                        | App\Http\Controllers\Api\PostsController@index                            | api                                             |
|        | POST      | api/posts/search                                | api.posts.search                       | App\Http\Controllers\Api\PostsController@index                            | api                                             |
|        | POST      | api/posts                                       | api.posts.store                        | App\Http\Controllers\Api\PostsController@store                            | api                                             |
|        | GET|HEAD  | api/posts/{post}                                | api.posts.show                         | App\Http\Controllers\Api\PostsController@show                             | api                                             |  
|        | PUT|PATCH | api/posts/{post}                                | api.posts.update                       | App\Http\Controllers\Api\PostsController@update                           | api                                             |
|        | DELETE    | api/posts/{post}                                | api.posts.destroy                      | App\Http\Controllers\Api\PostsController@destroy                          | api                                             |
|        | POST      | api/posts/batch                                 | api.posts.batchStore                   | App\Http\Controllers\Api\PostsController@batchStore                       | api                                             |
|        | PATCH     | api/posts/batch                                 | api.posts.batchUpdate                  | App\Http\Controllers\Api\PostsController@batchUpdate                      | api                                             |
|        | DELETE    | api/posts/batch                                 | api.posts.batchDestroy                 | App\Http\Controllers\Api\PostsController@batchDestroy                     | api                                             |
```

### Soft deletes

If your model uses `SoftDeletes` trait and you would like to expose the same functionality via API, call `withSoftDeletes` method upon resource registration.

```php
<?php

use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::resource('posts', 'Api\PostsController')->withSoftDeletes();
    ...
});

```

This will introduce `restore` and `batchRestore` endpoints. To learn how to permanently delete a resource via API (force delete), take a look at the related [Query Parameters](./query-parameters.html#soft-deletes) section.

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
...
|        | POST      | api/posts/{post}/restore                        | api.posts.restore                      | App\Http\Controllers\Api\PostsController@restore                          | api                                             |
|        | POST      | api/posts/batch/restore                         | api.posts.batchRestore                 | App\Http\Controllers\Api\PostsController@batchRestore                     | api                                             |
```

## Customizing Queries

Laravel Orion is quite flexible and allows you to redefine how Eloquent queries are build and run for each endpoint.

### For individual endpoints

#### Building queries

Let's say you would like the `index` endpoint to return only published blog posts. To do so, override the `buildIndexFetchQuery` method on the controller:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"

    /**
     * Builds Eloquent query for fetching entities in index method.
     *
     * @param Request $request
     * @param array $requestedRelations
     * @return Builder
     */
    protected function buildIndexFetchQuery(Request $request, array $requestedRelations): Builder
    {
        $query = parent::buildIndexFetchQuery($request, $requestedRelations);

        $query->whereNotNull('published_at');

        return $query;
    }
}
```

#### Running queries

A common example is selecting only specific columns when fetching a list of models. To do so, override the `runIndexFetchQuery` method:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"

    ...

    /**
     * Runs the given query for fetching entities in index method.
     *
     * @param Request $request
     * @param Builder $query
     * @param int $paginationLimit
     * @return LengthAwarePaginator
     */
    protected function runIndexFetchQuery(Request $request, Builder $query, int $paginationLimit): LengthAwarePaginator
    {
        return $query->paginate($paginationLimit, ['id', 'title' 'published_at']);
    }
}
```

#### Performing operations

The main purpose of endpoints like `index` or `show` is to retrieve data from the database, not change it. But endpoints like `store`, `update,` etc. make changes to the database. It is also possible to customize how certain operations, like storing a model, are performed.

In the given example we would force fill the attributes on the post, if the currenthly authenticated user is admin (roles implementation here is imaginary):

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"

    ...

    /**
     * Fills attributes on the given entity and stores it in database.
     *
     * @param Request $request
     * @param Model $entity
     * @param array $attributes
     */
    protected function performStore(Request $request, Model $entity, array $attributes): void
    {
        if ($this->resolveUser()->hasRole('admin')) {
            $entity->forceFill($attributes);
        } else {
            $entity->fill($attributes);
        }
        $entity->save();
    }
}
```

### For a group of endpoints

Cool, now index endpoint returns only published posts. But what if you would like to apply the same constraint to `show` endpoint as well? Sure enough, we could duplicate it and override the `buildShowFetchQuery` method, but there is a better way.

#### Building queries

If you take a look at how `buildIndexFetchQuery` method is implemented, you will notice that it uses `buildFetchQuery` method. In fact, this method is used by `index`, `show`, `update`, `destroy`, and `restore` endpoints to build the query for fetching model(s), and you can override it as well!

Here is how it would look like, if you would like to apply the same constraint to `index` and `show` endpoints (and `update`, `destroy`, and `restore`) at once:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"

    /**
     * Builds Eloquent query for fetching entity(-ies).
     *
     * @param Request $request
     * @param array $requestedRelations
     * @return Builder
     */
    protected function buildFetchQuery(Request $request, array $requestedRelations): Builder
    {
        $query = parent::buildFetchQuery($request, $requestedRelations);

        $query->whereNotNull('published_at');

        return $query;
    }

    ...
}
```

#### Running queries

While `index` endpoint is sort of an exception when it comes to running queries (since we fetch a list of models, not a single model), `show`, `update`, `destroy`, and `restore` endpoints share the same logic and use `runFetchQuery` under the hood.

With a bit of refactor we get the controller where only published blog posts are fetched and only `id`, `title`, and `published_at` columns (attributes) are retrieved from the database.

```php
<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"

    /**
     * The list of attributes to select from db
     */
    protected $attributes = ['id', 'title' 'published_at'];

    /**
     * Builds Eloquent query for fetching entity(-ies).
     *
     * @param Request $request
     * @param array $requestedRelations
     * @return Builder
     */
    protected function buildFetchQuery(Request $request, array $requestedRelations): Builder
    {
        $query = parent::buildFetchQuery($request, $requestedRelations);

        $query->whereNotNull('published_at');

        return $query;
    }

    /**
     * Runs the given query for fetching entity.
     *
     * @param Request $request
     * @param Builder $query
     * @param int|string $key
     * @return Model
     */
    protected function runFetchQuery(Request $request, Builder $query, $key): Model
    {
        return $query->select($this->attributes)->findOrFail($key);
    }

    /**
     * Runs the given query for fetching entities in index method.
     *
     * @param Request $request
     * @param Builder $query
     * @param int $paginationLimit
     * @return LengthAwarePaginator
     */
    protected function runIndexFetchQuery(Request $request, Builder $query, int $paginationLimit): LengthAwarePaginator
    {
        return $query->paginate($paginationLimit, $this->attributes);
    }

    /**
     * Fills attributes on the given entity and stores it in database.
     *
     * @param Request $request
     * @param Model $post
     * @param array $attributes
     */
    protected function performStore(Request $request, Model $post, array $attributes): void
    {
        if ($this->resolveUser()->hasRole('admin')) {
            $post->forceFill($attributes);
        } else {
            $post->fill($attributes);
        }
        $post->save();
    }
}
```

#### Methods map

| Method | Build | Run | Perform |
| ---- | ----- | --- | ------- |
| index | buildIndexFetchQuery | runIndexFetchQuery | - |
| store | - | - | performStore |
| show | buildShowFetchQuery | runShowFetchQuery | - |
| update | buildUpdateFetchQuery | runUpdateFetchQuery | performUpdate |
| destroy | buildDestroyFetchQuery | runDestroyFetchQuery | performDestroy |
| restore | buildRestoreFetchQuery | runRestoreFetchQuery | performRestore |