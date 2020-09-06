require("dotenv").config();
//require db connections
//require app
const app = require("./server/app");

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Using environment: ${process.env.NODE_ENV}`);
  console.log(`Server successfully started and listening on port ${PORT}`);
});
