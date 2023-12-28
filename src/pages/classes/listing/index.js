import fetchDataFromAPI from '@/services/fetchingData';
import { useState } from 'react';

const Listing = ({ initialClasses }) => {
  const [classes, setClasses] = useState(initialClasses.classes);
  const [isEditing, setIsEditing] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  console.log("initialClasses", initialClasses);

  const handleAddClass = async () => {
    const newClass = { id: classes.length + 1, name: `Class ${classes.length + 1}` };
    const updatedClasses = [...classes, newClass];
    console.log("updatedClasses", updatedClasses);
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newClass }), // Utiliza el objeto 'newClass'
      });
  
      if (response.ok) {
        console.log('Clase agregada exitosamente');
        setClasses(updatedClasses);
        // Realizar acciones adicionales si es necesario
      } else {
        console.error('Error al agregar la clase');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleEditClass = (classItem) => {
    setIsEditing(true);
    setEditingClass(classItem);
  };

  const handleSaveEdit = async () => {
    // Aquí puedes realizar la lógica para guardar los cambios de edición
    setIsEditing(false);
    setEditingClass(null);
    // Realiza la llamada a la API para actualizar la clase
    try {
      const response = await fetch('/api/classes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ editedClass: editingClass }), // Utiliza el objeto 'editingClass' con los cambios
      });
  
      if (response.ok) {
        console.log('Clase editada exitosamente');
        // Actualizar la lista de clases con los cambios hechos
        const updatedClasses = classes.map((classItem) =>
          classItem.id === editingClass.id ? editingClass : classItem
        );
        setClasses(updatedClasses);
      } else {
        console.error('Error al editar la clase');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

return (
    <div>
      <h1>Classes:</h1>
      <button onClick={handleAddClass}>Agregar Clase</button>
      <ul>
        {classes?.map((classItem) => (
          <li key={classItem.id}>
            <br/>
            {isEditing && editingClass && editingClass.id === classItem.id ? (
              <>
                <input
                  type="text"
                  value={editingClass.name}
                  onChange={(e) =>
                    setEditingClass({
                      ...editingClass,
                      name: e.target.value,
                    })
                  }
                />
                <button onClick={handleSaveEdit}>Guardar</button>
              </>
            ) : (
              <>
                <h1 onClick={() => handleEditClass(classItem)}>{classItem.name}</h1>
                <p>{classItem.content}</p>
                <p><b>Instructor: </b>{classItem.instructor}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {

  try {
    const classesData = await fetchDataFromAPI();

  
    return {
      props: {
        initialClasses: classesData || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialClasses: [], // Retorna un arreglo vacío o datos por defecto en caso de error
      },
    };
  }
}
export default Listing;
