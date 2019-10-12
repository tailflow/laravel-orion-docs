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

## One to One

```php
Orion::hasOneResource('profiles', 'image' , 'API\ProfileImageController');
```

**Available endpoints**

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | POST      | api/profiles/{profile}/image                    | api.profiles.relation.image.store      | App\Http\Controllers\API\ProfileImageController@store                     | api                                             |
|        | GET|HEAD  | api/profiles/{profile}/image/{image?}           | api.profiles.relation.image.show       | App\Http\Controllers\API\ProfileImageController@show                      | api                                             |
|        | PATCH     | api/profiles/{profile}/image/{image?}           | api.profiles.relation.image.update     | App\Http\Controllers\API\ProfileImageController@update                    | api                                             |
|        | PUT       | api/profiles/{profile}/image/{image?}           | api.profiles.relation.image.update     | App\Http\Controllers\API\ProfileImageController@update                    | api                                             |
|        | DELETE    | api/profiles/{profile}/image/{image?}           | api.profiles.relation.image.destroy    | App\Http\Controllers\API\ProfileImageController@destroy                   | api                                             |
```

## One to Many

```php
Orion::hasManyResource('users', 'posts' , 'API\UserPostsController');
```

**Available endpoints**

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | POST      | api/users/{user}/posts                          | api.users.relation.posts.store         | App\Http\Controllers\API\UserPostsController@store                        | api                                             |
|        | GET|HEAD  | api/users/{user}/posts                          | api.users.relation.posts.index         | App\Http\Controllers\API\UserPostsController@index                        | api                                             |
|        | PATCH     | api/users/{user}/posts/{posts?}                 | api.users.relation.posts.update        | App\Http\Controllers\API\UserPostsController@update                       | api                                             |
|        | DELETE    | api/users/{user}/posts/{posts?}                 | api.users.relation.posts.destroy       | App\Http\Controllers\API\UserPostsController@destroy                      | api                                             |
|        | GET|HEAD  | api/users/{user}/posts/{posts?}                 | api.users.relation.posts.show          | App\Http\Controllers\API\UserPostsController@show                         | api                                             |
|        | PUT       | api/users/{user}/posts/{posts?}                 | api.users.relation.posts.update        | App\Http\Controllers\API\UserPostsController@update                       | api                                             |
|        | POST      | api/users/{user}/posts/associate                | api.users.relation.posts.associate     | App\Http\Controllers\API\UserPostsController@associate                    | api                                             |
|        | DELETE    | api/users/{user}/posts/{posts}/dissociate       | api.users.relation.posts.dissociate    | App\Http\Controllers\API\UserPostsController@dissociate                   | api                                             |
```

### Inversed One to Many

```php
Orion::belongsToResource('posts', 'user' , 'API\PostUserController');
```

**Available endpoints**

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | PUT       | api/posts/{post}/user/{user?}                   | api.posts.relation.user.update         | App\Http\Controllers\API\PostUserController@update                        | api                                             |
|        | DELETE    | api/posts/{post}/user/{user?}                   | api.posts.relation.user.destroy        | App\Http\Controllers\API\PostUserController@destroy                       | api                                             |
|        | GET|HEAD  | api/posts/{post}/user/{user?}                   | api.posts.relation.user.show           | App\Http\Controllers\API\PostUserController@show                          | api                                             |
|        | PATCH     | api/posts/{post}/user/{user?}                   | api.posts.relation.user.update         | App\Http\Controllers\API\PostUserController@update                        | api                                             |
```

## Many to Many

```php
Orion::belongsToManyResource('users', 'roles' , 'API\UserRolesController');
```

**Available endpoints**

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | POST      | api/users/{user}/roles                          | api.users.relation.roles.store         | App\Http\Controllers\API\UserRolesController@store                        | api                                             |
|        | GET|HEAD  | api/users/{user}/roles                          | api.users.relation.roles.index         | App\Http\Controllers\API\UserRolesController@index                        | api                                             |
|        | PUT       | api/users/{user}/roles/{roles?}                 | api.users.relation.roles.update        | App\Http\Controllers\API\UserRolesController@update                       | api                                             |
|        | PATCH     | api/users/{user}/roles/{roles?}                 | api.users.relation.roles.update        | App\Http\Controllers\API\UserRolesController@update                       | api                                             |
|        | GET|HEAD  | api/users/{user}/roles/{roles?}                 | api.users.relation.roles.show          | App\Http\Controllers\API\UserRolesController@show                         | api                                             |
|        | DELETE    | api/users/{user}/roles/{roles?}                 | api.users.relation.roles.destroy       | App\Http\Controllers\API\UserRolesController@destroy                      | api                                             |
|        | POST      | api/users/{user}/roles/attach                   | api.users.relation.roles.attach        | App\Http\Controllers\API\UserRolesController@attach                       | api                                             |
|        | DELETE    | api/users/{user}/roles/detach                   | api.users.relation.roles.detach        | App\Http\Controllers\API\UserRolesController@detach                       | api                                             |
|        | PATCH     | api/users/{user}/roles/sync                     | api.users.relation.roles.sync          | App\Http\Controllers\API\UserRolesController@sync                         | api                                             |
|        | PATCH     | api/users/{user}/roles/toggle                   | api.users.relation.roles.toggle        | App\Http\Controllers\API\UserRolesController@toggle                       | api                                             |
|        | PATCH     | api/users/{user}/roles/{roles}/pivot            | api.users.relation.roles.pivot         | App\Http\Controllers\API\UserRolesController@updatePivot                  | api                                             |
```

### Inversed Many to Many

```php
Orion::belongsToManyResource('roles', 'users' , 'API\RoleUsersController');
```

**Available endpoints**

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | POST      | api/roles/{role}/users                          | api.roles.relation.users.store         | App\Http\Controllers\API\RoleUsersController@store                        | api                                             |
|        | GET|HEAD  | api/roles/{role}/users                          | api.roles.relation.users.index         | App\Http\Controllers\API\RoleUsersController@index                        | api                                             |
|        | PUT       | api/roles/{role}/users/{users?}                 | api.roles.relation.users.update        | App\Http\Controllers\API\RoleUsersController@update                       | api                                             |
|        | PATCH     | api/roles/{role}/users/{users?}                 | api.roles.relation.users.update        | App\Http\Controllers\API\RoleUsersController@update                       | api                                             |
|        | GET|HEAD  | api/roles/{role}/users/{users?}                 | api.roles.relation.users.show          | App\Http\Controllers\API\RoleUsersController@show                         | api                                             |
|        | DELETE    | api/roles/{role}/users/{users?}                 | api.roles.relation.users.destroy       | App\Http\Controllers\API\RoleUsersController@destroy                      | api                                             |
|        | POST      | api/roles/{role}/users/attach                   | api.roles.relation.users.attach        | App\Http\Controllers\API\RoleUsersController@attach                       | api                                             |
|        | DELETE    | api/roles/{role}/users/detach                   | api.roles.relation.users.detach        | App\Http\Controllers\API\RoleUsersController@detach                       | api                                             |
|        | PATCH     | api/roles/{role}/users/sync                     | api.roles.relation.users.sync          | App\Http\Controllers\API\RoleUsersController@sync                         | api                                             |
|        | PATCH     | api/roles/{role}/users/toggle                   | api.roles.relation.users.toggle        | App\Http\Controllers\API\RoleUsersController@toggle                       | api                                             |
|        | PATCH     | api/roles/{role}/users/{users}/pivot            | api.roles.relation.users.pivot         | App\Http\Controllers\API\RoleUsersController@updatePivot                  | api                                             |
```

## Has One Through

```php
Orion::hasOneThroughResource('posts', 'meta' , 'API\PostMetaController');
```

## Has Many Through

```php
Orion::hasManyThroughResource('users', 'comments' , 'API\UserCommentsController');
```

**Available endpoints**

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | GET|HEAD  | api/users/{user}/comments                       | api.users.relation.comments.index      | App\Http\Controllers\API\UserCommentsController@index                     | api                                             |
|        | PATCH     | api/users/{user}/comments/{comments?}           | api.users.relation.comments.update     | App\Http\Controllers\API\UserCommentsController@update                    | api                                             |
|        | GET|HEAD  | api/users/{user}/comments/{comments?}           | api.users.relation.comments.show       | App\Http\Controllers\API\UserCommentsController@show                      | api                                             |
|        | PUT       | api/users/{user}/comments/{comments?}           | api.users.relation.comments.update     | App\Http\Controllers\API\UserCommentsController@update                    | api                                             |
|        | DELETE    | api/users/{user}/comments/{comments?}           | api.users.relation.comments.destroy    | App\Http\Controllers\API\UserCommentsController@destroy                   | api                                             |
|        | POST      | api/users/{user}/comments/attach                | api.users.relation.comments.attach     | App\Http\Controllers\API\UserCommentsController@attach                    | api                                             |
|        | DELETE    | api/users/{user}/comments/detach                | api.users.relation.comments.detach     | App\Http\Controllers\API\UserCommentsController@detach                    | api                                             |
|        | PATCH     | api/users/{user}/comments/sync                  | api.users.relation.comments.sync       | App\Http\Controllers\API\UserCommentsController@sync                      | api                                             |
|        | PATCH     | api/users/{user}/comments/toggle                | api.users.relation.comments.toggle     | App\Http\Controllers\API\UserCommentsController@toggle                    | api                                             |
|        | PATCH     | api/users/{user}/comments/{comments}/pivot      | api.users.relation.comments.pivot      | App\Http\Controllers\API\UserCommentsController@updatePivot               | api                                             |
```

## One To One (Polymorphic)

```php
Orion::morphOneResource('posts', 'image', 'API\PostImageController');
```

**Available endpoints**

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
|        | POST      | api/posts/{post}/image                          | api.posts.relation.image.store         | App\Http\Controllers\API\PostImageController@store                        | api                                             |
|        | PATCH     | api/posts/{post}/image/{image?}                 | api.posts.relation.image.update        | App\Http\Controllers\API\PostImageController@update                       | api                                             |
|        | DELETE    | api/posts/{post}/image/{image?}                 | api.posts.relation.image.destroy       | App\Http\Controllers\API\PostImageController@destroy                      | api                                             |
|        | PUT       | api/posts/{post}/image/{image?}                 | api.posts.relation.image.update        | App\Http\Controllers\API\PostImageController@update                       | api                                             |
|        | GET|HEAD  | api/posts/{post}/image/{image?}                 | api.posts.relation.image.show          | App\Http\Controllers\API\PostImageController@show                         | api                                             |
```

## One To Many (Polymorphic)

```php
Orion::morphManyResource('posts', 'comments', 'API\PostCommentsController');
```

Inverse?

## Many To Many (Polymorphic)

```php
Orion::morphToManyResource('posts', 'tags', 'API\PostTagsController');
```

```php
Orion::morphToManyResource('tags', 'posts', 'API\TagPostsController');
```
