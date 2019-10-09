---
home: true
heroImage: /logo.png
heroText: Laravel Orion
tagline: The easiest way to create REST API with Laravel
actionText: Get Started →
actionLink: /guide/
features:
- title: Simple yet powerful
  details: Fully featured REST API for your Eloquent models and relationships with simplicity of Laravel as you love it.
- title: Easy to use and learn
  details: Utilizes standard Laravel features such as Request classes, Policies and API Resources.
- title: SDK out of box
  details: (coming soon...) TypesScript, Javascript, and Swift SDKs for your API. VueJS and Angular libraries.
footer: MIT Licensed | Copyright © 2019-present Aleksei Zarubin
---

### As Easy as 1, 2, 3

1. Define controllers

```php
<?php

namespace App\Http\Controllers\API;

use Laralord\Orion\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Fully-qualified model class name
     */
    protected static $model = Post::class; // or "App\Models\Post"
}
```

```php
<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Laralord\Orion\Http\Controllers\RelationController;

class UserPostsController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    protected static $model = User::class; // or "App\Models\User"

    /**
    * Name of the relationship as it is defined on the User model
    */
    protected static $relation = 'posts';
}
```

2. Register routes

```php
<?php

use Illuminate\Support\Facades\Route;
use Laralord\Orion\Orion;

Route::group(['as' => 'api.'], function() {
    Orion::resource('posts', 'API\PostsController');
    Orion::hasManyResource('users', 'posts' , 'API\UserPostsController');
});

```

3. Enjoy a fully featured REST API :relieved:

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | POST      | api/posts                                       | api.posts.store                        | App\Http\Controllers\API\PostsController@store                            | api                                             |
|        | GET|HEAD  | api/posts                                       | api.posts.index                        | App\Http\Controllers\API\PostsController@index                            | api                                             |
|        | DELETE    | api/posts/{post}                                | api.posts.destroy                      | App\Http\Controllers\API\PostsController@destroy                          | api                                             |
|        | PUT|PATCH | api/posts/{post}                                | api.posts.update                       | App\Http\Controllers\API\PostsController@update                           | api                                             |
|        | GET|HEAD  | api/posts/{post}                                | api.posts.show                         | App\Http\Controllers\API\PostsController@show                             | api                                             |
|        | POST      | api/users/{user}/posts                          | api.users.relation.posts.store         | App\Http\Controllers\API\UserPostsController@store                        | api                                             |
|        | GET|HEAD  | api/users/{user}/posts                          | api.users.relation.posts.index         | App\Http\Controllers\API\UserPostsController@index                        | api                                             |
|        | POST      | api/users/{user}/posts/associate                | api.users.relation.posts.associate     | App\Http\Controllers\API\UserPostsController@associate                    | api                                             |
|        | PATCH     | api/users/{user}/posts/{posts?}                 | api.users.relation.posts.update        | App\Http\Controllers\API\UserPostsController@update                       | api                                             |
|        | DELETE    | api/users/{user}/posts/{posts?}                 | api.users.relation.posts.destroy       | App\Http\Controllers\API\UserPostsController@destroy                      | api                                             |
|        | GET|HEAD  | api/users/{user}/posts/{posts?}                 | api.users.relation.posts.show          | App\Http\Controllers\API\UserPostsController@show                         | api                                             |
|        | PUT       | api/users/{user}/posts/{posts?}                 | api.users.relation.posts.update        | App\Http\Controllers\API\UserPostsController@update                       | api                                             |
|        | DELETE    | api/users/{user}/posts/{posts}/dissociate       | api.users.relation.posts.dissociate    | App\Http\Controllers\API\UserPostsController@dissociate                   | api                                             | 
```
