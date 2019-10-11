# Introduction

## How It Works

Laravel Orion uses the most powerful features of Laravel: Eloquent models and relationships, policies, request classes, and API resources, which makes it incredibly powerful and extensible, yet simple to get started with.

You create a controller, associate it with Eloquent model you would like to manage via API and let Laravel Orion do the REST (see what I've done here :smile:) for you! All endpoints (`index`, `show`, `store`, `update`, `destroy`) will already be there with proper authorization, validation and error handling (you need to define policies and request classes yourself, of course).

But it does end here. Define relationship controllers, and it will allow your API consumers to manage all types of relations. Yes, all, which means `associate`/`dissociate`, `attach`/`detach`, `sync`, `toggle`, `updatePivot` as well as CRUD operations are available via a standardized REST API.

And, as a bonus, by using query parameters you can include relations, filter, sort and search across data - all with just a few lines of code.

## Features

* REST API for [models](./models.html) and [relationships](./relationships.html)
* [Filtering](./query-parameters.html#filtering), [sorting](./query-parameters.html#sorting), [searching](./query-parameters.html#searching), and [relations inclusion](./query-parameters.html#including-relations) via query parameters
* Straightforward [authorization](./security.html#authorization) and [validation](./security.html#validation)
* [Responses](./responses.html) transformation via API resources.
