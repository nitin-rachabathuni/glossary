
# Glossary Term Data Model

Made with React and Node




## API Reference

#### Get all terms glossary

```http
  GET /terms
```

Returns all the term glossary

#### Create term glossary

```http
  POST /terms
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `term`      | `string` | **Required**. |
| `definition`      | `string` | **Required**. |

Create a new term glossary




## Authors

- [@nitin](https://github.com/nitin-rachabathuni)


## Installation

Install with npm

```bash
  npm install
  cd client
  npm install
  npm run build
  cd ../client
  npm run start
```
    