// pages/api/classes.js

import fs from 'fs';
import path from 'path';

// const databasePath = path.join(process.cwd(), 'data', 'classes.json');
const databasePath = "classes.json";
export default function handler(req, res) {
  if (req.method === 'GET') {
    const classesData = getClasses();
    console.log("classesData api", classesData);
    res.status(200).json(classesData);
  } else if (req.method === 'POST') {
    const { newClass } = req.body;
    addNewClass(newClass);
    res.status(200).json({ message: 'Clase agregada exitosamente' });
  } else if (req.method === 'PUT') {
    const { editedClass } = req.body;
    updateClass(editedClass);
    res.status(200).json({ message: 'Clase actualizada exitosamente' });
  }
}

function updateClass(editedClass) {
  const classes = getClasses().classes || [];
  const updatedClasses = classes.map((classItem) => {
    if (classItem.id === editedClass.id) {
      return editedClass; // Reemplazar la clase existente con la clase editada
    }
    return classItem;
  });
  updateClasses({ classes: updatedClasses });
}

function getClasses() {
  const classesData = fs.readFileSync(databasePath);
  return JSON.parse(classesData);
}

function updateClasses(classes) {
  fs.writeFileSync(databasePath, JSON.stringify(classes, null, 2));
}

function addNewClass(newClass) {
  const existingClasses = getClasses().classes || [];
  const updatedClasses = [...existingClasses, newClass];
  updateClasses({ classes: updatedClasses });
}
