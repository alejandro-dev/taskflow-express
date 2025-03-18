import app from './app'

// Start the server. By default, the port is 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
   console.log(`Servidor corriendo en http://localhost:${port}`);
});

export default app