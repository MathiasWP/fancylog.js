# fancylog - make your console.log(fancy) 🦄

## Demo:
[Click here for demo](https://mathiaspicker.com/fancylog)

&nbsp;

## Install:

### With NPM 📦:

#### `npm install fancylog`

### With CDN 🌐:

#### `<script src="https://cdn.jsdelivr.net/npm/fancylogjs@1.0.0"></script>`

### Locally 📁:

#### `<script src="path/to/fancylogjs.js"></script>`

&nbsp;

## API:

### `fancylog(<string>, <object>)`

#### `<string>` info:
To divide the string parts for styling, simply declare them with <></> tags.
To set the id of the tag, write #{id} within the first tag.

To add images, simply write `<img src="src-to-image" />`.
You can also add id's to images, simply add a #{id} anywhere within the img-tag

#### `<object>` info:
The object sets the styling of the declared tags within the string.
Use CSS in JS to declare properties and values.

#### Example:
```
fancylog('<#id1>Hello, i'm blue dabedeedabeda!</> I have no styling, <#id2>but i am underlined!</> <img src="/myimage.png" #image/>',
    {
        id1: {
            color: 'blue',
            fontWeight: 'bold',
            fontSize: '2rem'
        },
        id2: { textDecoration: 'underline' },
        image: {
            width: '300px',
            height: '200px'
        }
    });
```

&nbsp;

##### Not supported:
- Nested tags
