import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.status(200).json({
      payload: {
        employees: rows,
      },
    });
  } catch (error) {
    let message = null;
    if (error.errno == "-3008") {
      message = "Error con la conexion de la base de datos";
    }

    if (error.errno == "1045") {
      message = "ER_ACCESS_DENIED_ERROR";
    }

    if (error.errno == "1049") {
      message = "ER_BAD_DB_ERROR";
    }

    return res.status(500).json({
      error: {
        code: "EMPLOYEES500",
        message: [`Error: ValidationException: ${message}`],
        httpStatus: 500,
      },
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        error: {
          code: "EMPLOYEES002",
          message: [
            `Error: ValidationException: No se encontraron registros segun el id`,
          ],
          httpStatus: 404,
        },
      });

    res.status(200).json({
      payload: {
        employee: rows[0],
      },
    });
  } catch (error) {
    let message = null;
    if (error.errno == "-3008") {
      message = "Error con la conexion de la base de datos";
    }

    if (error.errno == "1045") {
      message = "ER_ACCESS_DENIED_ERROR";
    }

    if (error.errno == "1049") {
      message = "ER_BAD_DB_ERROR";
    }

    return res.status(500).json({
      error: {
        code: "EMPLOYEES500",
        message: [`Error: ValidationException: ${message}`],
        httpStatus: 500,
      },
    });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const { name, salary } = req.body.payload;

    if (typeof name == "string" && typeof salary == "number") {
      const [rows] = await pool.query(
        "INSERT INTO employee (name, salary) VALUES (?, ?)",
        [name, salary]
      );

      if (rows.insertId != 0) {
        res.status(200);
        res.json({
          payload: {
            code: "CRG-000",
            message: "La operación se ejecutó con éxito.",
          },
        });
      }
    } else {
      const nameValidation =
        typeof name != "string"
          ? "El tipo de datos de Name no es el correcto, debe contener caracteres"
          : "";
      const salaryValidation =
        typeof name != "number"
          ? "El tipo de datos de salary no es el correcto, debe contener numbers"
          : "";
      res.status(422).json({
        error: {
          code: "EMPLOYEES001",
          message: [
            `Error: ValidationException: ${nameValidation} ${salaryValidation}`,
          ],
          httpStatus: 422,
        },
      });
    }
  } catch (error) {
    let message = null;
    if (error.errno == "-3008") {
      message = "Error con la conexion de la base de datos";
    }

    if (error.errno == "1045") {
      message = "ER_ACCESS_DENIED_ERROR";
    }

    if (error.errno == "1049") {
      message = "ER_BAD_DB_ERROR";
    }

    return res.status(500).json({
      error: {
        code: "EMPLOYEES500",
        message: [`Error: ValidationException: ${message}`],
        httpStatus: 500,
      },
    });
  }
};

export const updateEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body.payload;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        error: {
          code: "EMPLOYEES004",
          message: [
            `Error: ValidationException: La operación no se ejecutó correctamente, revisar los datos ingresados.`,
          ],
          httpStatus: 404,
        },
      });

    res.status(200).json({
      payload: {
        code: "CRG-000",
        message: "La operación se ejecutó con éxito.",
      },
    });
  } catch (error) {
    let message = null;
    if (error.errno == "-3008") {
      message = "Error con la conexion de la base de datos";
    }

    if (error.errno == "1045") {
      message = "ER_ACCESS_DENIED_ERROR";
    }

    if (error.errno == "1049") {
      message = "ER_BAD_DB_ERROR";
    }

    return res.status(500).json({
      error: {
        code: "EMPLOYEES500",
        message: [`Error: ValidationException: ${message}`],
        httpStatus: 500,
      },
    });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        error: {
          code: "EMPLOYEES003",
          message: [
            `Error: ValidationException: No se afecto ningun registros`,
          ],
          httpStatus: 404,
        },
      });

    res.status(200).json({
      payload: {
        code: "CRG-000",
        message: "La operación se ejecutó con éxito.",
      },
    });
  } catch (error) {
    let message = null;
    if (error.errno == "-3008") {
      message = "Error con la conexion de la base de datos";
    }

    if (error.errno == "1045") {
      message = "ER_ACCESS_DENIED_ERROR";
    }

    if (error.errno == "1049") {
      message = "ER_BAD_DB_ERROR";
    }

    return res.status(500).json({
      error: {
        code: "EMPLOYEES500",
        message: [`Error: ValidationException: ${message}`],
        httpStatus: 500,
      },
    });
  }
};
