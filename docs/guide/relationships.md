# Relationships

## Setting up Controller

Defining model relationship controller is very similar to defining model controller.

```php
<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Laralord\Orion\Http\Controllers\RelationController;

class PostCommentsController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    protected static $model = Post::class; // or "App\Models\Post"

    /**
    * Name of the relationship as it is defined on the Post model
    */
    protected static $relation = 'comments';
}
```

At this point, you do not need to worry about different relationship types - controllers are defined in the same way for all types of the relationships.

::: warning KEY TAKEAWAYS

* Model relationship controllers always extend `Laralord\Orion\Http\Controllers\RelationController`
* `$model` property is set to a fully qualified model class name
* `$relation` property is set to the exact relationship name as it is defined on the model

:::

## Setting up Routes

Routes, unlike controllers, are defined in a different way for each relationship type.

```php
<?php

use Illuminate\Support\Facades\Route;
use Laralord\Orion\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::<relation type>Resource('<resource name>', '<relation name>', '<controller>');
    ...
});

```

While you need to call different methods, their signature is the same: resource name, relation name, and controller.

Alternatively, you can register routes using `Orion::resourceRelation` method and a fully-qualified relationship class name.

```php
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laralord\Orion\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::resourceRelation('users', 'posts', 'API\UserPostsController', HasMany::class);
    ...
});

```

## hasOne

```php
Orion::hasOneResource('profiles', 'image' , 'API\ProfileImageController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| POST      | api/profiles/{profile}/image                    | api.profiles.relation.image.store      | App\Http\Controllers\API\ProfileImageController@store                     |
| GET|HEAD  | api/profiles/{profile}/image/{image}            | api.profiles.relation.image.show       | App\Http\Controllers\API\ProfileImageController@show                      |
| PATCH     | api/profiles/{profile}/image/{image}            | api.profiles.relation.image.update     | App\Http\Controllers\API\ProfileImageController@update                    |
| PUT       | api/profiles/{profile}/image/{image}            | api.profiles.relation.image.update     | App\Http\Controllers\API\ProfileImageController@update                    |
| DELETE    | api/profiles/{profile}/image/{image}            | api.profiles.relation.image.destroy    | App\Http\Controllers\API\ProfileImageController@destroy                   |
```

## hasMany

```php
Orion::hasManyResource('users', 'posts' , 'API\UserPostsController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| GET|HEAD  | api/users/{user}/posts                          | api.users.relation.posts.index         | App\Http\Controllers\API\UserPostsController@index                        |
| POST      | api/users/{user}/posts                          | api.users.relation.posts.store         | App\Http\Controllers\API\UserPostsController@store                        |
| GET|HEAD  | api/users/{user}/posts/{post}                   | api.users.relation.posts.show          | App\Http\Controllers\API\UserPostsController@show                         |
| PATCH     | api/users/{user}/posts/{post}                   | api.users.relation.posts.update        | App\Http\Controllers\API\UserPostsController@update                       |
| PUT       | api/users/{user}/posts/{post}                   | api.users.relation.posts.update        | App\Http\Controllers\API\UserPostsController@update                       |
| DELETE    | api/users/{user}/posts/{post}                   | api.users.relation.posts.destroy       | App\Http\Controllers\API\UserPostsController@destroy                      |
| POST      | api/users/{user}/posts/associate                | api.users.relation.posts.associate     | App\Http\Controllers\API\UserPostsController@associate                    |
| DELETE    | api/users/{user}/posts/{post}/dissociate       | api.users.relation.posts.dissociate    | App\Http\Controllers\API\UserPostsController@dissociate                   |
```

## belongsTo

```php
Orion::belongsToResource('posts', 'user' , 'API\PostUserController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| GET|HEAD  | api/posts/{post}/user/{user}                    | api.posts.relation.user.show           | App\Http\Controllers\API\PostUserController@show                          |
| PATCH     | api/posts/{post}/user/{user}                    | api.posts.relation.user.update         | App\Http\Controllers\API\PostUserController@update                        |
| PUT       | api/posts/{post}/user/{user}                    | api.posts.relation.user.update         | App\Http\Controllers\API\PostUserController@update                        |
| DELETE    | api/posts/{post}/user/{user}                    | api.posts.relation.user.destroy        | App\Http\Controllers\API\PostUserController@destroy                       |
```

## belongsToMany

```php
Orion::belongsToManyResource('users', 'roles' , 'API\UserRolesController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| GET|HEAD  | api/users/{user}/roles                          | api.users.relation.roles.index         | App\Http\Controllers\API\UserRolesController@index                        |
| POST      | api/users/{user}/roles                          | api.users.relation.roles.store         | App\Http\Controllers\API\UserRolesController@store                        |
| GET|HEAD  | api/users/{user}/roles/{role}                   | api.users.relation.roles.show          | App\Http\Controllers\API\UserRolesController@show                         |
| PATCH     | api/users/{user}/roles/{role}                   | api.users.relation.roles.update        | App\Http\Controllers\API\UserRolesController@update                       |
| PUT       | api/users/{user}/roles/{role}                   | api.users.relation.roles.update        | App\Http\Controllers\API\UserRolesController@update                       |
| DELETE    | api/users/{user}/roles/{role}                   | api.users.relation.roles.destroy       | App\Http\Controllers\API\UserRolesController@destroy                      |
| POST      | api/users/{user}/roles/attach                   | api.users.relation.roles.attach        | App\Http\Controllers\API\UserRolesController@attach                       |
| DELETE    | api/users/{user}/roles/detach                   | api.users.relation.roles.detach        | App\Http\Controllers\API\UserRolesController@detach                       |
| PATCH     | api/users/{user}/roles/sync                     | api.users.relation.roles.sync          | App\Http\Controllers\API\UserRolesController@sync                         |
| PATCH     | api/users/{user}/roles/toggle                   | api.users.relation.roles.toggle        | App\Http\Controllers\API\UserRolesController@toggle                       |
| PATCH     | api/users/{user}/roles/{role}/pivot            | api.users.relation.roles.pivot         | App\Http\Controllers\API\UserRolesController@updatePivot                  |
```

## hasOneThrough

```php
Orion::hasOneThroughResource('posts', 'meta' , 'API\PostMetaController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| POST      | api/posts/{post}/meta                           | api.posts.relation.meta.store          | App\Http\Controllers\API\PostMetaController@store                         |
| GET|HEAD  | api/posts/{post}/meta/{meta}                    | api.posts.relation.meta.show           | App\Http\Controllers\API\PostMetaController@show                          |
| PATCH     | api/posts/{post}/meta/{meta}                    | api.posts.relation.meta.update         | App\Http\Controllers\API\PostMetaController@update                        |
| PUT       | api/posts/{post}/meta/{meta}                    | api.posts.relation.meta.update         | App\Http\Controllers\API\PostMetaController@update                        |
| DELETE    | api/posts/{post}/meta/{meta}                    | api.posts.relation.meta.destroy        | App\Http\Controllers\API\PostMetaController@destroy                       |
```

## hasManyThrough

```php
Orion::hasManyThroughResource('users', 'comments' , 'API\UserCommentsController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| GET|HEAD  | api/users/{user}/comments                       | api.users.relation.comments.index      | App\Http\Controllers\API\UserCommentsController@index                     |
| GET|HEAD  | api/users/{user}/comments/{comment}             | api.users.relation.comments.show       | App\Http\Controllers\API\UserCommentsController@show                      |
| PATCH     | api/users/{user}/comments/{comment}             | api.users.relation.comments.update     | App\Http\Controllers\API\UserCommentsController@update                    |
| PUT       | api/users/{user}/comments/{comment}             | api.users.relation.comments.update     | App\Http\Controllers\API\UserCommentsController@update                    |
| DELETE    | api/users/{user}/comments/{comment}             | api.users.relation.comments.destroy    | App\Http\Controllers\API\UserCommentsController@destroy                   |
| POST      | api/users/{user}/comments/associate             | api.users.relation.comments.associate  | App\Http\Controllers\API\UserCommentsController@associate                 |
| DELETE    | api/users/{user}/comments/{comment}/dissociate | api.users.relation.comments.dissociate | App\Http\Controllers\API\UserCommentsController@dissociate                |
```

## morphOne

```php
Orion::morphOneResource('posts', 'image', 'API\PostImageController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| POST      | api/posts/{post}/image                          | api.posts.relation.image.store         | App\Http\Controllers\API\PostImageController@store                        |
| GET|HEAD  | api/posts/{post}/image/{image}                  | api.posts.relation.image.show          | App\Http\Controllers\API\PostImageController@show                         |
| PATCH     | api/posts/{post}/image/{image}                  | api.posts.relation.image.update        | App\Http\Controllers\API\PostImageController@update                       |
| PUT       | api/posts/{post}/image/{image}                  | api.posts.relation.image.update        | App\Http\Controllers\API\PostImageController@update                       |
| DELETE    | api/posts/{post}/image/{image}                  | api.posts.relation.image.destroy       | App\Http\Controllers\API\PostImageController@destroy                      |
```

## morphMany

```php
Orion::morphManyResource('posts', 'comments', 'API\PostCommentsController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| GET|HEAD  | api/posts/{post}/comments                       | api.posts.relation.comments.index      | App\Http\Controllers\API\PostCommentsController@index                     |
| POST      | api/posts/{post}/comments                       | api.posts.relation.comments.store      | App\Http\Controllers\API\PostCommentsController@store                     |
| GET|HEAD  | api/posts/{post}/comments/{comment}             | api.posts.relation.comments.show       | App\Http\Controllers\API\PostCommentsController@show                      |
| PATCH     | api/posts/{post}/comments/{comment}             | api.posts.relation.comments.update     | App\Http\Controllers\API\PostCommentsController@update                    |
| PUT       | api/posts/{post}/comments/{comment}             | api.posts.relation.comments.update     | App\Http\Controllers\API\PostCommentsController@update                    |
| DELETE    | api/posts/{post}/comments/{comment}             | api.posts.relation.comments.destroy    | App\Http\Controllers\API\PostCommentsController@destroy                   |
| POST      | api/posts/{post}/comments/associate             | api.posts.relation.comments.associate  | App\Http\Controllers\API\PostCommentsController@associate                 |
| DELETE    | api/posts/{post}/comments/{comment}/dissociate | api.posts.relation.comments.dissociate | App\Http\Controllers\API\PostCommentsController@dissociate                |
```

## morphToMany

```php
Orion::morphToManyResource('posts', 'tags', 'API\PostTagsController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| GET|HEAD  | api/posts/{post}/tags                           | api.posts.relation.tags.index          | App\Http\Controllers\API\PostTagsController@index                         |
| POST      | api/posts/{post}/tags                           | api.posts.relation.tags.store          | App\Http\Controllers\API\PostTagsController@store                         |
| GET|HEAD  | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.show           | App\Http\Controllers\API\PostTagsController@show                          |
| PATCH     | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.update         | App\Http\Controllers\API\PostTagsController@update                        |
| PUT       | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.update         | App\Http\Controllers\API\PostTagsController@update                        |
| DELETE    | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.destroy        | App\Http\Controllers\API\PostTagsController@destroy                       |
| POST      | api/posts/{post}/tags/attach                    | api.posts.relation.tags.attach         | App\Http\Controllers\API\PostTagsController@attach                        |
| DELETE    | api/posts/{post}/tags/detach                    | api.posts.relation.tags.detach         | App\Http\Controllers\API\PostTagsController@detach                        |
| PATCH     | api/posts/{post}/tags/sync                      | api.posts.relation.tags.sync           | App\Http\Controllers\API\PostTagsController@sync                          |
| PATCH     | api/posts/{post}/tags/toggle                    | api.posts.relation.tags.toggle         | App\Http\Controllers\API\PostTagsController@toggle                        |
| PATCH     | api/posts/{post}/tags/{tag}/pivot              | api.posts.relation.tags.pivot          | App\Http\Controllers\API\PostTagsController@updatePivot                   |
```
