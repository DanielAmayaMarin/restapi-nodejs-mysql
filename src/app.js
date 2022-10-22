import express from "express";
import employeesRoutes from "./routes/employees.routes.js";

const app = express();
app.use(express.json())
app.use('/api',employeesRoutes);
app.use((req, res, next) =>{
    res.status(404).json({
        message: 'endpoint not found'
    })
});

export default app;