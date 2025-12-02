/*
    Hoy me encontre con mi yo mas joven para tomar un café.
       Encendi un cigarro... y el se levantó de la mesa.
          .-~~~~-.
         /  =____=
        /_______|
        | o     |
        |   O   |
        |       |
        |_______|
        |       |      .-~~~~-.
        |       |     /  =____=
        |   |   |    /_______|
        |   |   |    | o     |
        |   |   |    |   O   |
  ______|___|___|____|_______|______
  \                             /
   \                           /
    `~-.___               ___-~'
         |  |   | | |   |  |
         |  |   | | |   |  |
         |  |   | | |   |  |
         (~~-)~~| | |~~(~~-)
                | | |
                (---)
                 `-'
*/

import app from "./app.js";
import seed from "../prisma/seed.js";

const execute = async () => {
    await seed();

    app.listen(app.get("port"), () => {
        console.log("Server started on port " + app.get("port"));
    })
}

execute();