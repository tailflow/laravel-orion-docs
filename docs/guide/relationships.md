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

## One to Many

```php
Orion::hasManyResource('users', 'posts' , 'API\UserPostsController');
```

```php
Orion::belongsToResource('posts', 'user' , 'API\PostUserController');
```

## Many to Many

```php
Orion::belongsToManyResource('users', 'roles' , 'API\UserRolesController');
```

```php
Orion::belongsToManyResource('roles', 'users' , 'API\RoleUsersController');
```

## Has One Through

```php
Orion::hasOneThroughResource('posts', 'meta' , 'API\PostMetaController');
```

## Has Many Through

```php
Orion::hasManyThroughResource('users', 'comments' , 'API\UserCommentsController');
```

## One To One (Polymorphic)

```php
Orion::morphOneResource('posts', 'image', 'API\PostImageController');
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