# Relationships

## Setting up Controller

Defining model relationship controller is very similar to defining model controller.

```php
<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Orion\Http\Controllers\RelationController;

class PostCommentsController extends RelationController
{
    /**
     * Fully-qualified model class name
     */
    protected $model = Post::class; // or "App\Models\Post"

    /**
    * Name of the relationship as it is defined on the Post model
    */
    protected $relation = 'comments';
}
```

At this point, you do not need to worry about different relationship types - controllers are defined in the same way for all types of the relationships.

### Fillable pivot fields and casting

Hovewer, if you are defining the controller for `belongsToMany` or `morphToMany` relation type and have additional fields on pivot table, there are two additional properties to note - `protected $pivotFillable` and `protected $pivotJson`.

The `$pivotFillable` property needs to contain the list of pivot table fields that can be updated via `attach`, `sync`, `toggle` and `updatePivot` endpoints.

The `$pivotJson` property should contain the list of json fields on the pivot table that you would like to automatically cast to/from array. If you have defined `$casts` property on the related [Pivot model](https://laravel.com/docs/master/eloquent-relationships#defining-custom-intermediate-table-models), then you can skip it.

::: warning KEY TAKEAWAYS

* Model relationship controllers always extend `Orion\Http\Controllers\RelationController`
* `$model` property is set to a fully qualified model class name
* `$relation` property is set to the exact relationship name as it is defined on the model

:::

## Setting up Routes

Routes, unlike controllers, are defined in a different way for each relationship type.

```php
<?php

use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::hasOneResource('profiles', 'image' , 'API\ProfileImageController');
    Orion::hasManyResource('users', 'posts' , 'API\UserPostsController');
    Orion::belongsToResource('posts', 'user' , 'API\PostUserController');
    Orion::belongsToManyResource('users', 'roles' , 'API\UserRolesController');
    Orion::hasOneThroughResource('posts', 'meta' , 'API\PostMetaController');
    Orion::hasManyThroughResource('users', 'comments' , 'API\UserCommentsController');
    Orion::morphOneResource('posts', 'image', 'API\PostImageController');
    Orion::morphManyResource('posts', 'comments', 'API\PostCommentsController');
    Orion::morphToManyResource('posts', 'tags', 'API\PostTagsController');
    ...
});

```

While you need to call different methods, their signature is the same: resource name, relation name, and controller.

Alternatively, you can register routes using `Orion::resourceRelation` method and a fully-qualified relationship class name.

```php
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::resourceRelation('users', 'posts', 'API\UserPostsController', HasMany::class);
    ...
});

```

### Soft Deletes

If your relation model uses `SoftDeletes` trait and you would like to expose the same functionality via API, add `'softDeletes' => true` to the options array in the last parameter of the route registration method.

```php
<?php

use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function() {
    ...
    Orion::hasManyResource('users', 'posts', 'API\UserPostsController', ['softDeletes' => true]);
    ...
});

```

This will introduce `restore` endpoint. To learn how to permanently delete a resource via API (force delete), take a look at the related [Query Parameters](./query-parameters.html#soft-deletes) section.

```bash
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
| Domain | Method    | URI                                             | Name                                   | Action                                                                    | Middleware                                      |
+--------+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+-------------------------------------------------+
...
|        | POST      | api/users/{user}/posts/{post}/restore           | api.users.relation.posts.restore       | App\Http\Controllers\API\UserPostsController@restore                      | api                                             |
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
| GET|HEAD  | api/profiles/{profile}/image/{image?}           | api.profiles.relation.image.show       | App\Http\Controllers\API\ProfileImageController@show                      |
| PATCH     | api/profiles/{profile}/image/{image?}           | api.profiles.relation.image.update     | App\Http\Controllers\API\ProfileImageController@update                    |
| PUT       | api/profiles/{profile}/image/{image?}           | api.profiles.relation.image.update     | App\Http\Controllers\API\ProfileImageController@update                    |
| DELETE    | api/profiles/{profile}/image/{image?}           | api.profiles.relation.image.destroy    | App\Http\Controllers\API\ProfileImageController@destroy                   |
```

:::tip TIP
Notice that the last parameter is marked as optional. Because it's a one-to-one relation, you can access the endpoint without providing related key - Laravel Orion will take care of it :slightly_smiling_face:

`hasOne`, `belongsTo`, `hasOneThrough` and `morphOne` relations do not require the related resource key.
:::

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
| POST      | api/users/{user}/posts/search                   | api.users.relation.posts.search        | App\Http\Controllers\API\UserPostsController@index                        |
| POST      | api/users/{user}/posts                          | api.users.relation.posts.store         | App\Http\Controllers\API\UserPostsController@store                        |
| GET|HEAD  | api/users/{user}/posts/{post}                   | api.users.relation.posts.show          | App\Http\Controllers\API\UserPostsController@show                         |
| PATCH     | api/users/{user}/posts/{post}                   | api.users.relation.posts.update        | App\Http\Controllers\API\UserPostsController@update                       |
| PUT       | api/users/{user}/posts/{post}                   | api.users.relation.posts.update        | App\Http\Controllers\API\UserPostsController@update                       |
| DELETE    | api/users/{user}/posts/{post}                   | api.users.relation.posts.destroy       | App\Http\Controllers\API\UserPostsController@destroy                      |
| POST      | api/users/{user}/posts/associate                | api.users.relation.posts.associate     | App\Http\Controllers\API\UserPostsController@associate                    |
| DELETE    | api/users/{user}/posts/{post}/dissociate        | api.users.relation.posts.dissociate    | App\Http\Controllers\API\UserPostsController@dissociate                   |
```

### Associating

The `hasMany` relation resource provides `associate` endpoint to associate relation resource with the main resource.

Request payload to the endpoint has only one field - `related_key`. In our example, `related_key` would be ID of a post to be associated with user.

**Example request:**

```json
// (POST) api/users/{user}/posts/associate
{
    "related_key" : 5
}
```

### Dissociating

The `hasMany` relation resource also provides `dissociate` endpoint to dissociate relation resource from the main resource.

There is no payload in request for this endpoint, however notice the `{post}` route parameter in the example routes above - this would be ID of a post to be dissociated from a user.

## belongsTo

```php
Orion::belongsToResource('posts', 'user' , 'API\PostUserController');
```

**Available endpoints**

```bash
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| Method    | URI                                             | Name                                   | Action                                                                    |
+-----------+-------------------------------------------------+----------------------------------------+---------------------------------------------------------------------------+
| GET|HEAD  | api/posts/{post}/user/{user?}                   | api.posts.relation.user.show           | App\Http\Controllers\API\PostUserController@show                          |
| PATCH     | api/posts/{post}/user/{user?}                   | api.posts.relation.user.update         | App\Http\Controllers\API\PostUserController@update                        |
| PUT       | api/posts/{post}/user/{user?}                   | api.posts.relation.user.update         | App\Http\Controllers\API\PostUserController@update                        |
| DELETE    | api/posts/{post}/user/{user?}                   | api.posts.relation.user.destroy        | App\Http\Controllers\API\PostUserController@destroy                       |
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
| POST      | api/users/{user}/roles/search                   | api.users.relation.roles.search        | App\Http\Controllers\API\UserRolesController@index                        |
| POST      | api/users/{user}/roles                          | api.users.relation.roles.store         | App\Http\Controllers\API\UserRolesController@store                        |
| GET|HEAD  | api/users/{user}/roles/{role}                   | api.users.relation.roles.show          | App\Http\Controllers\API\UserRolesController@show                         |
| PATCH     | api/users/{user}/roles/{role}                   | api.users.relation.roles.update        | App\Http\Controllers\API\UserRolesController@update                       |
| PUT       | api/users/{user}/roles/{role}                   | api.users.relation.roles.update        | App\Http\Controllers\API\UserRolesController@update                       |
| DELETE    | api/users/{user}/roles/{role}                   | api.users.relation.roles.destroy       | App\Http\Controllers\API\UserRolesController@destroy                      |
| POST      | api/users/{user}/roles/attach                   | api.users.relation.roles.attach        | App\Http\Controllers\API\UserRolesController@attach                       |
| DELETE    | api/users/{user}/roles/detach                   | api.users.relation.roles.detach        | App\Http\Controllers\API\UserRolesController@detach                       |
| PATCH     | api/users/{user}/roles/sync                     | api.users.relation.roles.sync          | App\Http\Controllers\API\UserRolesController@sync                         |
| PATCH     | api/users/{user}/roles/toggle                   | api.users.relation.roles.toggle        | App\Http\Controllers\API\UserRolesController@toggle                       |
| PATCH     | api/users/{user}/roles/{role}/pivot             | api.users.relation.roles.pivot         | App\Http\Controllers\API\UserRolesController@updatePivot                  |
```

:::warning ATTENTION

Do not forget to define fillable pivot fields as described in [Fillable pivot fields and casting](./relationships.html#setting-up-controller) section, if you have additional fields on pivot table, otherwise `attach`, `sync`, `toggle` and `updatePivot` endpoints may not work as expected for these fields.

:::

### Attaching

The `belongsToMany` relation resource provides `attach` endpoint to attach one or multiple relation resources to the main resource. For details on how attaching/detaching of related models works in Laravel, take a look at [Attaching / Detaching](https://laravel.com/docs/master/eloquent-relationships#updating-many-to-many-relationships) section in Laravel Documenation.

Request payload consist of required `resources` and optional `duplicates` fields. Note, that `duplicates` field can also be provided as query parameter.

The `resources` field might be an array or an object. If it is an array, then array items would be IDs of related resources that you would like to attach. If it is an object, then its keys would be IDs of related resources and values - objects containing pivot table fields to be set upon attaching the related resource.

By default `duplicates` parameter is `false`. If set to `true`, attaching the same related resource multiple times would result in duplicated entries in pivot table.

**Example request (array version):**

```json
// (POST) api/users/{user}/roles/attach
{
    "resources" : [3,4,7]
}
```

**Example request (object version):**

```json
// (POST) api/users/{user}/roles/attach
{
    "resources" : {
        "3" : {
            "example_pivot_field" : "value A",
            ...
        },
        "4" : {
            "example_pivot_field" : "value B",
            ...
        },
        "7" : {
            "example_pivot_field" : "value C",
            ...
        }
    }
}
```

### Detaching

The `belongsToMany` relation resource provides `detach` endpoint to detach one or multiple relation resources to the main resource.

Request payload consist of only one field `resources`.

Similar to the `attach` endpoint, `resources` field might be an array or an object. By providing support for object representation of `resources` field in this method, it makes it easier for the frontend to attach/detach related resources in a standardized way. You can also optionally store additional data in these objects that can be used in `beforeDetach` or `afterDetach` hooks.

**Example request (array version):**

```json
// (DELETE) api/users/{user}/roles/detach
{
    "resources" : [3,4,7]
}
```

**Example request (object version):**

```json
// (DELETE) api/users/{user}/roles/detach
{
    "resources" : {
        "3" : {},
        "4" : {
            "some_field" : "some value",
            ...
        },
        "7" : {},
    }
}
```

### Syncing

The `belongsToMany` relation resource provides `sync` endpoint to sync one or multiple relation resources on the main resource. For details on how syncing of related models works in Laravel, take a look at [Syncing Associations](https://laravel.com/docs/master/eloquent-relationships#updating-many-to-many-relationships) section in Laravel Documentation.

Request payload consist of required `resources` and optional `detaching` fields. Note, that `detaching` field can also be provided as query parameter.

The `resources` field might be an array or an object. If it is an array, then array items would be IDs of related resources that you would like to sync. If it is an object, then its keys would be IDs of related resources and values - objects containing pivot table fields to be set upon syncing the related resource.

By default `detaching` parameter is `true`. If set to `false`, related resources that are missing in the payload, but preset in pivot table won't be detached.

**Example request (array version):**

```json
// (PATCH) api/users/{user}/roles/sync
{
    "resources" : [3,4]
}
```

**Example request (object version):**

```json
// (PATCH) api/users/{user}/roles/sync
{
    "resources" : {
        "3" : {
            "example_pivot_field" : "value A",
            ...
        },
        "4" : {
            "example_pivot_field" : "value B",
            ...
        },
    }
}
```

### Toggling

The `belongsToMany` relation resource provides `toggle` endpoint to "toggle" the attachment status of one or multiple relation resources. For details on how "toggling" of related models works in Laravel, take a look at [Toggling Associations](https://laravel.com/docs/master/eloquent-relationships#updating-many-to-many-relationships) section in Laravel Documenation.

Request payload consist of only one field `resources`. Same as the sync endpoint, `resources` field might be an array or an object.

**Example request (array version):**

```json
// (PATCH) api/users/{user}/roles/toggle
{
    "resources" : [3,4]
}
```

**Example request (object version):**

```json
// (PATCH) api/users/{user}/roles/toggle
{
    "resources" : {
        "3" : {
            "example_pivot_field" : "value A",
            ...
        },
        "4" : {
            "example_pivot_field" : "value B",
            ...
        },
    }
}
```

### Updating pivot

The `belongsToMany` relation resource provides `pivot` endpoint to update pivot row of one relation resource. For details on how pivot row is updated, take a look at [Updating A Record On A Pivot Table](https://laravel.com/docs/master/eloquent-relationships) section in Laravel Documentation.

Request payload consist of only one field `pivot`. Its properties are pivot table fields that will be updated for the related resource.

**Example request:**

```json
// (PATCH) api/users/{user}/roles/{role}/pivot
{
    "pivot" : { // properties correspond to the columns in pivot table
        "example_pivot_field" : "updated value",
        "another_pivot_field" : "new value"
        ...
    }
}
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
| GET|HEAD  | api/posts/{post}/meta/{meta?}                   | api.posts.relation.meta.show           | App\Http\Controllers\API\PostMetaController@show                          |
| PATCH     | api/posts/{post}/meta/{meta?}                   | api.posts.relation.meta.update         | App\Http\Controllers\API\PostMetaController@update                        |
| PUT       | api/posts/{post}/meta/{meta?}                   | api.posts.relation.meta.update         | App\Http\Controllers\API\PostMetaController@update                        |
| DELETE    | api/posts/{post}/meta/{meta?}                   | api.posts.relation.meta.destroy        | App\Http\Controllers\API\PostMetaController@destroy                       |
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
| POST      | api/users/{user}/comments/search                | api.users.relation.comments.search     | App\Http\Controllers\API\UserCommentsController@index                     |
| GET|HEAD  | api/users/{user}/comments/{comment}             | api.users.relation.comments.show       | App\Http\Controllers\API\UserCommentsController@show                      |
| PATCH     | api/users/{user}/comments/{comment}             | api.users.relation.comments.update     | App\Http\Controllers\API\UserCommentsController@update                    |
| PUT       | api/users/{user}/comments/{comment}             | api.users.relation.comments.update     | App\Http\Controllers\API\UserCommentsController@update                    |
| DELETE    | api/users/{user}/comments/{comment}             | api.users.relation.comments.destroy    | App\Http\Controllers\API\UserCommentsController@destroy                   |
| POST      | api/users/{user}/comments/associate             | api.users.relation.comments.associate  | App\Http\Controllers\API\UserCommentsController@associate                 |
| DELETE    | api/users/{user}/comments/{comment}/dissociate  | api.users.relation.comments.dissociate | App\Http\Controllers\API\UserCommentsController@dissociate                |
```

### Associating

The `hasManyThrough` relation resource provides `associate` endpoint to associate relation resource with the main resource.

Request payload to the endpoint has only one field - `related_key`. In our example, `related_key` would be ID of a comment to be associated with user.

**Example request:**

```json
// (POST) api/users/{user}/comments/associate
{
    "related_key" : 3
}
```

### Dissociating

The `hasManyThrough` relation resource also provides `dissociate` endpoint to dissociate relation resource from the main resource.

There is no payload in request for this endpoint, however notice the `{comment}` route parameter in the example routes above - this would be ID of a comment to be dissociated from user.

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
| GET|HEAD  | api/posts/{post}/image/{image?}                 | api.posts.relation.image.show          | App\Http\Controllers\API\PostImageController@show                         |
| PATCH     | api/posts/{post}/image/{image?}                 | api.posts.relation.image.update        | App\Http\Controllers\API\PostImageController@update                       |
| PUT       | api/posts/{post}/image/{image?}                 | api.posts.relation.image.update        | App\Http\Controllers\API\PostImageController@update                       |
| DELETE    | api/posts/{post}/image/{image?}                 | api.posts.relation.image.destroy       | App\Http\Controllers\API\PostImageController@destroy                      |
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
| POST      | api/posts/{post}/comments/search                | api.posts.relation.comments.search     | App\Http\Controllers\API\PostCommentsController@index                     |
| POST      | api/posts/{post}/comments                       | api.posts.relation.comments.store      | App\Http\Controllers\API\PostCommentsController@store                     |
| GET|HEAD  | api/posts/{post}/comments/{comment}             | api.posts.relation.comments.show       | App\Http\Controllers\API\PostCommentsController@show                      |
| PATCH     | api/posts/{post}/comments/{comment}             | api.posts.relation.comments.update     | App\Http\Controllers\API\PostCommentsController@update                    |
| PUT       | api/posts/{post}/comments/{comment}             | api.posts.relation.comments.update     | App\Http\Controllers\API\PostCommentsController@update                    |
| DELETE    | api/posts/{post}/comments/{comment}             | api.posts.relation.comments.destroy    | App\Http\Controllers\API\PostCommentsController@destroy                   |
| POST      | api/posts/{post}/comments/associate             | api.posts.relation.comments.associate  | App\Http\Controllers\API\PostCommentsController@associate                 |
| DELETE    | api/posts/{post}/comments/{comment}/dissociate  | api.posts.relation.comments.dissociate | App\Http\Controllers\API\PostCommentsController@dissociate                |
```

### Associating

The `morphMany` relation resource provides `associate` endpoint to associate relation resource with the main resource.

Request payload to the endpoint has only one field - `related_key`. In our example, `related_key` would be ID of a comment to be associated with post.

**Example request:**

```json
// (POST) api/posts/{post}/comments/associate
{
    "related_key" : 8
}
```

### Dissociating

The `morphMany` relation resource also provides `dissociate` endpoint to dissociate relation resource from the main resource.

There is no payload in request for this endpoint, however notice the `{comment}` route parameter in the example routes above - this would be ID of a comment to be dissociated from post.

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
| POST      | api/posts/{post}/tags/search                    | api.posts.relation.tags.search         | App\Http\Controllers\API\PostTagsController@index                         |
| POST      | api/posts/{post}/tags                           | api.posts.relation.tags.store          | App\Http\Controllers\API\PostTagsController@store                         |
| GET|HEAD  | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.show           | App\Http\Controllers\API\PostTagsController@show                          |
| PATCH     | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.update         | App\Http\Controllers\API\PostTagsController@update                        |
| PUT       | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.update         | App\Http\Controllers\API\PostTagsController@update                        |
| DELETE    | api/posts/{post}/tags/{tag}                     | api.posts.relation.tags.destroy        | App\Http\Controllers\API\PostTagsController@destroy                       |
| POST      | api/posts/{post}/tags/attach                    | api.posts.relation.tags.attach         | App\Http\Controllers\API\PostTagsController@attach                        |
| DELETE    | api/posts/{post}/tags/detach                    | api.posts.relation.tags.detach         | App\Http\Controllers\API\PostTagsController@detach                        |
| PATCH     | api/posts/{post}/tags/sync                      | api.posts.relation.tags.sync           | App\Http\Controllers\API\PostTagsController@sync                          |
| PATCH     | api/posts/{post}/tags/toggle                    | api.posts.relation.tags.toggle         | App\Http\Controllers\API\PostTagsController@toggle                        |
| PATCH     | api/posts/{post}/tags/{tag}/pivot               | api.posts.relation.tags.pivot          | App\Http\Controllers\API\PostTagsController@updatePivot                   |
```

:::warning ATTENTION

Do not forget to define fillable pivot fields as described in [Fillable pivot fields and casting](./relationships.html#setting-up-controller) section, if you have additional fields on pivot table, otherwise `attach`, `sync`, `toggle` and `updatePivot` endpoints may not work as expected for these fields.

:::

### Attaching

The `morphToMany` relation resource provides `attach` endpoint to attach one or multiple relation resources to the main resource. For details on how attaching/detaching of related models works in Laravel, take a look at [Attaching / Detaching](https://laravel.com/docs/master/eloquent-relationships#updating-many-to-many-relationships) section in Laravel Documenation.

Request payload consist of required `resources` and optional `duplicates` fields. Note, that `duplicates` field can also be provided as query parameter.

The `resources` field might be an array or an object. If it is an array, then array items would be IDs of related resources that you would like to attach. If it is an object, then its keys would be IDs of related resources and values - objects containing pivot table fields to be set upon attaching the related resource.

By default `duplicates` parameter is `false`. If set to `true`, attaching the same related resource multiple times would result in duplicated entries in pivot table.

**Example request (array version):**

```json
// (POST) api/posts/{post}/tags/attach
{
    "resources" : [3,4,7]
}
```

**Example request (object version):**

```json
// (POST) api/posts/{post}/tags/attach
{
    "resources" : {
        "3" : {
            "example_pivot_field" : "value A",
            ...
        },
        "4" : {
            "example_pivot_field" : "value B",
            ...
        },
        "7" : {
            "example_pivot_field" : "value C",
            ...
        }
    }
}
```

### Detaching

The `morphToMany` relation resource provides `detach` endpoint to detach one or multiple relation resources to the main resource.

Request payload consist of only one field `resources`.

Similar to the `attach` endpoint, `resources` field might be an array or an object. By providing support for object representation of `resources` field in this method, it makes it easier for the frontend to attach/detach related resources in a standardized way. You can also optionally store additional data in these objects that can be used in `beforeDetach` or `afterDetach` hooks.

**Example request (array version):**

```json
// (DELETE) api/posts/{post}/tags/detach
{
    "resources" : [3,4,7]
}
```

**Example request (object version):**

```json
// (DELETE) api/posts/{post}/tags/detach
{
    "resources" : {
        "3" : {},
        "4" : {
            "some_field" : "some value",
            ...
        },
        "7" : {},
    }
}
```

### Syncing

The `morphToMany` relation resource provides `sync` endpoint to sync one or multiple relation resources on the main resource. For details on how syncing of related models works in Laravel, take a look at [Syncing Associations](https://laravel.com/docs/master/eloquent-relationships#updating-many-to-many-relationships) section in Laravel Documentation.

Request payload consist of required `resources` and optional `detaching` fields. Note, that `detaching` field can also be provided as query parameter.

The `resources` field might be an array or an object. If it is an array, then array items would be IDs of related resources that you would like to sync. If it is an object, then its keys would be IDs of related resources and values - objects containing pivot table fields to be set upon syncing the related resource.

By default `detaching` parameter is `true`. If set to `false`, related resources that are missing in the payload, but preset in pivot table won't be detached.

**Example request (array version):**

```json
// (PATCH) api/posts/{post}/tags/sync
{
    "resources" : [3,4]
}
```

**Example request (object version):**

```json
// (PATCH) api/posts/{post}/tags/sync
{
    "resources" : {
        "3" : {
            "example_pivot_field" : "value A",
            ...
        },
        "4" : {
            "example_pivot_field" : "value B",
            ...
        },
    }
}
```

### Toggling

The `morphToMany` relation resource provides `toggle` endpoint to "toggle" the attachment status of one or multiple relation resources. For details on how "toggling" of related models works in Laravel, take a look at [Toggling Associations](https://laravel.com/docs/master/eloquent-relationships#updating-many-to-many-relationships) section in Laravel Documenation.

Request payload consist of only one field `resources`. Same as the sync endpoint, `resources` field might be an array or an object.

**Example request (array version):**

```json
// (PATCH) api/posts/{post}/tags/toggle
{
    "resources" : [3,4]
}
```

**Example request (object version):**

```json
// (PATCH) api/posts/{post}/tags/toggle
{
    "resources" : {
        "3" : {
            "example_pivot_field" : "value A",
            ...
        },
        "4" : {
            "example_pivot_field" : "value B",
            ...
        },
    }
}
```

### Updating pivot

The `morphToMany` relation resource provides `pivot` endpoint to update pivot row of one relation resource. For details on how pivot row is updated, take a look at [Updating A Record On A Pivot Table](https://laravel.com/docs/master/eloquent-relationships) section in Laravel Documentation.

Request payload consist of only one field `pivot`. Its properties are pivot table fields that will be updated for the related resource.

**Example request:**

```json
// (PATCH) api/posts/{post}/tags/{tag}/pivot
{
    "pivot" : { // properties correspond to the columns in pivot table
        "example_pivot_field" : "updated value",
        "another_pivot_field" : "new value"
        ...
    }
}
```
