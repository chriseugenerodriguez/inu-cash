const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const routes = require("./api/routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(compression());
app.use(cookieparser());
app.use(helmet());
app.use(cors());

app.use("", routes);

// Start up the Node server
app.listen(port, () => {
  console.log(`Node server listening on http://localhost:${port}`);
});
