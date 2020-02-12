# Responses

Laravel Orion uses [API Resources](https://laravel.com/docs/master/eloquent-resources) as a transformation layer between Eloquent models and actual responses that are returned to your API clients.

To allow these classes to be resolved automatically, they should follow the pattern: `App\Http\Resources\<model>Resource` or `App\Http\Resources\<model>CollectionResource`.

For example, if you have `App\Models\Message` model, the related resource class would be `App\Http\Resources\MessageResource` or `App\Http\Resources\MessageCollectionResource`.

If resource class names in your app do not follow this naming convention or if you just would like to be more explicit, set `protected $resource` or `protected $collectionResource` property on controller to a fully-qualified resource class name.

```php

namespace App\Http\Controllers\API;

use App\Models\Message;
use App\Http\Resources\CustomMessageResource;
use App\Http\Resources\CustomMessageCollectionResource;

class MessagesController extends APIController
{
    /**
     * @var string|null $model
     */
    protected $model = Message::class;

    /**
    * @var string|null $resource
    */
    protected $resource = CustomMessageResource::class;

     /**
    * @var string|null $collectionResource
    */
    protected $collectionResource = CustomMessageCollectionResource::class;
}
```

::: tip TIP
There is a handy `toArrayWithMerge` method available on both `Resource` and `CollectionResource` classes under `Orion\Http\Resources` namespace - take a look there :wink:
:::
