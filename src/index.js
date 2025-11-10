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

const execute = async () => {
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    })
}
execute();