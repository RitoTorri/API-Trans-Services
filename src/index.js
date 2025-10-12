import app from "./app.js";

const execute = async () => {
    app.listen(3000, () => {
        console.log("Server started on port http://localhost:3000");
    })
}
execute();