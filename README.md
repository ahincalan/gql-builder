[![NPM Version][npm-image]][npm-url]
[![Build Status](https://travis-ci.com/ahincalan/gql-builder.svg?branch=master)](https://travis-ci.com/ahincalan/gql-builder)
[![Coverage Status](https://coveralls.io/repos/github/ahincalan/gql-builder/badge.svg?branch=master)](https://coveralls.io/github/ahincalan/gql-builder?branch=master)


# GQL Builder
Programmatically Graphql Query Builder Component  

##### Install Package
```text
npm install gql-builder
```

##### Features
* Simple usage
* Query support
* Mutation support
* Nested fields support

##### Usage Examples


---

###### Query Example 1


String Usage
```text
'query {
    user {
        id
        name
    }
}'
```
GqlBuilder Usage
```js
const qb =  new GqlBuilder();
qb.addSibling('user',['id', 'name']);
qb.toQueryString();
```

GqlBuilder Alternative Usage 
```js
const qb =  new GqlBuilder();
qb.addSibling({ name:'user', fields:['id', 'name']});
qb.toQueryString();
```

---

###### Query Example 2
String Usage
```text
'query {
    user {
        id
        name
        country {
            code
            name            
        }
    }
}'
```

GqlBuilder Usage
```js
const qb =  new GqlBuilder();
qb.addSibling('user',['id','name',
  {name:'country', fields:['code', 'name']}]);
qb.toQueryString();
```

GqlBuilder Alternative Usage 
```js
const qb =  new GqlBuilder();
qb.addChild('user', ['id', 'name']).
    addChild('country', ['code', 'name']);
qb.toQueryString();
```

---

###### Query Example 3
String Usage
```text
'query ($id: 'Int') {
    user (id: $id) {
        id
        name
        country {
            code
            name            
        }
    }
}'
```

GqlBuilder Usage
```js
const qb =  new GqlBuilder();
qb.addSibling('user',['id','name',
  {name:'country', fields:['code', 'name']}],
  {id:'Int'});
qb.toQueryString();
```

GqlBuilder Alternative Usage 
```js
const qb =  new GqlBuilder();
qb.addChild('user', ['id', 'name'], {id: 'Int'}).
    addChild('country', ['code', 'name']);
qb.toQueryString();
```

---

###### Mutation Example 1
String Usage
```text
'mutation ($user: User_Input) {
    createUser (user: $user) {
        id
        name
    }
}'
```

GqlBuilder Usage
```js
const qb =  new GqlBuilder();
qb.addSibling('createUser', ['id','name'], {user:'User_Input'});
qb.toMutationString();
```

GqlBuilder Alternative Usage 
```js
const qb =  new GqlBuilder();
qb.addSibling({name:'createUser', fields:['id','name'], filters:{user:'User_Input'}});
qb.toMutationString();
```

---

###### Mutation Example 2
String Usage
```text
'mutation ($id: Int, $name: String, $gender: String) {
    updateUser (id: $id, user: {
        name: $name
        gender: $gender
    }) {
        id
        name
        gender
    }
}'
```

GqlBuilder Usage
```js
const qb =  new GqlBuilder();
qb.addSibling('updateUser', ['id','name','gender'], 
  {
    id: 'Int', 
    user: {name:'String', gender:'String'}
  });
qb.toMutationString();
```

GqlBuilder Alternative Usage 
```js
const qb =  new GqlBuilder();
qb.addSibling({
  name:'createUser', 
  fields:['id','name'], 
  filters: {
             id: 'Int', 
             user: {name:'String', gender:'String'}
           }
});
qb.toMutationString();
```

[npm-image]: https://img.shields.io/npm/v/gql-builder.svg
[npm-url]: https://npmjs.org/package/gql-builder
