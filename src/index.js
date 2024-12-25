import app from "./app.js";
import logger from "./config/logger.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {
        // Connect to the database
        await connectDB();

        // Start the server only after a successful DB connection
        app.listen(PORT, () => {
            logger.info(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
        });
    } catch (error) {
        // Log the error and exit the process if DB connection fails
        logger.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

// Start the server
startServer();
