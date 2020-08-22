---
home: true
heroImage: /logo.png
heroText: Laravel Orion
tagline: The simplest way to create REST API with Laravel
actionText: Get Started →
actionLink: /guide/
features:
- title: Simple yet powerful
  details: Fully featured REST API for your Eloquent models and relationships with the simplicity of Laravel as you love it.
- title: Easy to use and learn
  details: Utilizes standard Laravel features such as Request classes, Policies and API Resources.
- title: SDK out of box
  details: (coming soon...) TypesScript SDK
footer: MIT Licensed | Copyright © 2019-present Aleksei Zarubin
---

### As Easy as 1, 2, 3

1. Define controllers

```php
<?php

namespace App\Http\Controllers\API;

use Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"
}
```

```php
<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Orion\Http\Controllers\RelationController;

class PostTagsController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"

    /**
    * Name of the relationship as it is defined on the Post model
    */
    protected $relation = 'tags';
}
```

::: warning ATTENTION
Make sure to have [policy](https://laravel.com/docs/master/authorization#creating-policies) created and registered for the model you are exposing via the API or consider using `DisableAuthorization` trait (only for local testing) to avoid getting 403 error, if the policy is not registered or incorrect.
:::

2. Register routes

```php
<?php

use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function() {
    Orion::resource('posts', 'API\PostsController')->withSoftDeletes();
    Orion::morphToManyResource('posts', 'tags' , 'API\PostTagsController');
});

```

3. Enjoy a fully featured REST API :relieved:

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | GET|HEAD  | api/posts                                       | api.posts.index                        | App\Http\Controllers\API\PostsController@index                            | api                                             |
|        | POST      | api/posts/search                                | api.posts.search                       | App\Http\Controllers\API\PostsController@index                            | api                                             |
|        | POST      | api/posts                                       | api.posts.store                        | App\Http\Controllers\API\PostsController@store                            | api                                             |
|        | GET|HEAD  | api/posts/{post}                                | api.posts.show                         | App\Http\Controllers\API\PostsController@show                             | api                                             |
|        | PUT|PATCH | api/posts/{post}                                | api.posts.update                       | App\Http\Controllers\API\PostsController@update                           | api                                             |
|        | DELETE    | api/posts/{post}                                | api.posts.destroy                      | App\Http\Controllers\API\PostsController@destroy                          | api                                             |
|        | POST      | api/posts/{post}/restore                        | api.posts.restore                      | App\Http\Controllers\API\PostsController@restore                          | api                                             |
|        | POST      | api/posts/batch                                 | api.posts.batchStore                   | App\Http\Controllers\API\PostsController@batchStore                       | api                                             |
|        | PATCH     | api/posts/batch                                 | api.posts.batchUpdate                  | App\Http\Controllers\API\PostsController@batchUpdate                      | api                                             |
|        | DELETE    | api/posts/batch                                 | api.posts.batchDestroy                 | App\Http\Controllers\API\PostsController@batchDestroy                     | api                                             |
|        | POST      | api/posts/batch/restore                         | api.posts.batchRestore                 | App\Http\Controllers\API\PostsController@batchRestore                     | api                                             |
|        | GET|HEAD  | api/posts/{post}/tags                           | api.posts.relation.tags.index          | App\Http\Controllers\API\PostTagsController@index                         | api                                             |
|        | POST      | api/posts/{post}/tags/search                    | api.posts.relation.tags.search         | App\Http\Controllers\API\PostTagsController@index                         | api                                             |
|        | POST      | api/posts/{post}/tags                           | api.posts.relation.tags.store          | App\Http\Controllers\API\PostTagsController@store                         | api                                             |
|        | GET|HEAD  | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.show           | App\Http\Controllers\API\PostTagsController@show                          | api                                             |
|        | PUT|PATCH | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.update         | App\Http\Controllers\API\PostTagsController@update                        | api                                             |
|        | DELETE    | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.destroy        | App\Http\Controllers\API\PostTagsController@destroy                       | api                                             |
|        | POST      | api/posts/{post}/tags/batch                     | api.posts.relation.tags.batchStore     | App\Http\Controllers\API\PostTagsController@batchStore                    | api                                             |
|        | PATCH     | api/posts/{post}/tags/batch                     | api.posts.relation.tags.batchUpdate    | App\Http\Controllers\API\PostTagsController@batchUpdate                   | api                                             |
|        | DELETE    | api/posts/{post}/tags/batch                     | api.posts.relation.tags.batchDestroy   | App\Http\Controllers\API\PostTagsController@batchDestroy                  | api                                             |
|        | POST      | api/posts/{post}/tags/attach                    | api.posts.relation.tags.attach         | App\Http\Controllers\API\PostTagsController@attach                        | api                                             |
|        | DELETE    | api/posts/{post}/tags/detach                    | api.posts.relation.tags.detach         | App\Http\Controllers\API\PostTagsController@detach                        | api                                             |
|        | PATCH     | api/posts/{post}/tags/sync                      | api.posts.relation.tags.sync           | App\Http\Controllers\API\PostTagsController@sync                          | api                                             |
|        | PATCH     | api/posts/{post}/tags/toggle                    | api.posts.relation.tags.toggle         | App\Http\Controllers\API\PostTagsController@toggle                        | api                                             |
|        | PATCH     | api/posts/{post}/tags/{tag}/pivot               | api.posts.relation.tags.pivot          | App\Http\Controllers\API\PostTagsController@updatePivot                   | api                                             |
```
