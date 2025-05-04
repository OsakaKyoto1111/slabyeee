const express = require("express");
const authRoute = require("./routes/authRoute");
const clubRoute = require("./routes/clubRoute")
const userRoute = require("./routes/userRoute")
const eventRoute = require("./routes/eventRoute");
const paymentRoute = require("./routes/paymentRoute")
const venueRoute = require("./routes/venueRoute")
const ticketRoute = require("./routes/paymentRoute")
const notificationsRoute = require("./routes/notificationRoute");
const helmet = require("helmet");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/connectDb")
const cors = require("cors");
const roleRoute = require("./routes/roleRoute");
const applicationRoute = require("./routes/applicationRoute");
const path = require("path"); 

connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/clubs', clubRoute);
app.use('/api/events', eventRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/venues', venueRoute);
app.use('/api/tickets', ticketRoute);
app.use('/api/notifications', notificationsRoute);
app.use('/api/roles', roleRoute);
app.use('/api/applications', applicationRoute);



app.use(errorHandler);

module.exports = app;