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

::: warning KEY TAKEAWAYS
* Model relationship controllers always extend `Laralord\Orion\Http\Controllers\RelationController`
* `$model` property is set to a fully qualified model class name
* `$relation` property is set to the exact relationship name as it is defined on the model
:::

## Setting up Routes
## One to One
## One to Many
## Many to Many
## Has One Through
## Has Many Through
## One To One (Polymorphic)
## One To Many (Polymorphic)
## Many To Many (Polymorphic)