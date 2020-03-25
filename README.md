# UMinho 2020 - Frontend Class

A very basic skeleton for the UMinho 2020 FE class.

It has an HTML file that loads two resources: CSS files for our stylesheets and a JS file for our scripts.

To start this project, open the `index.html` file on a browser.

## Presentation

Introductory presentation to frontend development: https://docs.google.com/presentation/d/1wflP4ewVCN_I-h_Ur-8TVzBAungdy2RFb2P6enWkSDM/

## Development

`npm install` to install this project dependencies.

`npm start` to start the development server.

## Resources

*Data*:

- Todos list to fetch: http://www.mocky.io/v2/5e7a000b3000007800930554
  - Returns the same content as `https://jsonplaceholder.typicode.com/todos` but with CORS headers.

# Conclusions

Disadvantages of this solution:

- Code all on the same file;
- No separation of concerns (view, model, events, data fetching);
- Code gets messy very quickly;
- Global vars (list, rootElement and functions);
- State on the HTML (DOM);

# Homework Challenges

1. ~~API returns some todos with `{ completed: true }`:~~
  - ~~All todos with `completed=true` must have the class "done"~~

2. ~~Todos counter - 3/5:~~
  - ~~3 is the number of uncompleted todos~~
  - ~~5 is the number of total todos~~

3. ~~Support multiple instances of todos on the same page:~~
  - ~~Create a more modularized application;~~
  - ~~Reduce the number of global symbols that we currently have;~~
