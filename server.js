const app = require('./app');

// code for listening the server on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
