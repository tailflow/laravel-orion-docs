# Introduction

## Features

- Models with typed [attributes](/guide/typescript-sdk/models.html#attributes) and [relationships](/guide/typescript-sdk/relationships.html#definition)
- Support of all API operations on [model](/guide/models.html) and [relationship](/guide/relationships.html) resources
- Extensive [search queries](/guide/typescript-sdk/models.html#searching-for-resources)
- [Automatic XSRF token fetching](/guide/typescript-sdk/configuration.html#auth-driver) for seamless integration with [Sanctum](https://laravel.com/docs/master/sanctum#spa-authenticating)

## How It Works

Laravel Orion TypeScript SDK allows you to build expressive frontend applications powered by REST API.

```typescript
import {Orion} from "@tailflow/laravel-orion/lib/orion";
import {Model} from "@tailflow/laravel-orion/lib/model";

Orion.init('https://your-api.test');
Orion.setToken('access-token-here');

export class Post extends Model<{
    title: string,
    body: string
}>
{

}

// retrieve a list of posts
const posts = await Post.$query().get();

// create a post
const newPost = await Post.$query().store({
    title: 'New post' // <-- you get a nice autocompletion here, because the attributes are typed 
});

// and a lot of other cool stuff
```

Ready to dive deeper? Head to the [Getting Started](/guide/typescript-sdk/getting-started.html) section and start building.