# Query Parameters

## Including Relations

When building a query, you can instruct the API to include relations in the response.

```typescript
const post = await Post.$query().with(['user', 'comments']).find(5); 

console.log(post.$relations.user);
console.log(post.$relations.comments);
```

## Soft Deletes

### Including trashed resources

```typescript
const posts = await Post.$query().withTrashed().get();
```

### Returning only trashed resources

```typescript
const posts = await Post.$query().onlyTrashed().get();
```