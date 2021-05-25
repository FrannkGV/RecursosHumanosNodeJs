const express = require('express');
const jwt = require('jsonwebtoken');
const employee = express.Router();
const db = require('../config/database');

employee.post("/agregar", async (req, res, next) => {
    const {
        empleado_nombre,
        empleado_apellidos,
        empleado_telefono,
        empleado_correo,
        empleado_direccion
    } = req.body;

    if (empleado_nombre && empleado_apellidos && empleado_telefono && empleado_correo && empleado_direccion) {
        let query = "INSERT INTO empleados (empleado_nombre, empleado_apellidos, empleado_telefono, empleado_correo, empleado_direccion) ";
        query += `VALUES ('${empleado_nombre}', '${empleado_apellidos}', '${empleado_telefono}', '${empleado_correo}', '${empleado_direccion}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({
                code: 200,
                message: "Empleado agregado Correctamente"
            });
        }
        return res.status(200).json({
            code: 500,
            message: "Ocurrió un error"
        });
    }
    return res.status(200).json({
        code: 500,
        message: "Campos incompletos"
    });
});

employee.patch("/modificar", async (req, res, next) => {
    const {
        empleado_id,
        empleado_nombre,
        empleado_apellidos,
        empleado_telefono,
        empleado_correo,
        empleado_direccion
    } = req.body;

    if (empleado_id && empleado_nombre && empleado_apellidos && empleado_telefono && empleado_correo && empleado_direccion) {
        let query = `UPDATE empleados SET empleado_nombre='${empleado_nombre}', empleado_apellidos='${empleado_apellidos}',`;
        query += `empleado_telefono='${empleado_telefono}', empleado_correo='${empleado_correo}', empleado_direccion='${empleado_direccion}' WHERE empleado_id=${empleado_id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({
                code: 200,
                message: "Empleado actualizado Correctamente"
            });
        }
        return res.status(200).json({
            code: 500,
            message: "Ocurrió un error"
        });
    }
    return res.status(200).json({
        code: 500,
        message: "Campos incompletos"
    });
});

employee.delete("/eliminar", async (req, res, next) => {
    const {
        empleado_id
    } = req.body;
    if (empleado_id) {
        const query = `DELETE FROM empleados WHERE empleado_id=${empleado_id}`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({
                code: 200,
                message: "Empleado eliminado"
            });
        }
        return res.status(200).json({
            code: 500,
            message: "Ocurrió un error"
        });
    }
    return res.status(200).json({
        code: 500,
        message: "Campos incompletos"
    });
});

employee.post("/buscar", async (req, res) => {
    const {
        empleado_nombre
    } = req.body.data;
    if (empleado_nombre) {
        const query = ` SELECT * FROM empleados WHERE empleado_nombre='${empleado_nombre}'`;
        const rows = await db.query(query);

        if (rows.length > 0) {
            return res.status(200).json({
                code: 200,
                message: "Empleado encontrado",
                empleado: rows
            });
        }
        return res.status(200).json({
            code: 500,
            message: "Ocurrió un error"
        });
    }
    return res.status(200).json({
        code: 500,
        message: "Campos incompletos"
    });
});

employee.get("/", async (req, res, next) => {
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({
        code: 200,
        message: emp
    });
});


module.exports = employee;