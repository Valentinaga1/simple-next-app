import fetchDataFromAPI from '@/services/fetchingData';
import { useState, useEffect } from 'react';

const Listing = ({ initialClasses }) => {
  const [classes, setClasses] = useState(initialClasses);
  const [isEditing, setIsEditing] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [newClassName, setNewClassName] = useState('');

  const handleAddClass = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newClassName, // Utiliza el nuevo nombre ingresado
          body: 'Some content here', // Agrega contenido si es necesario
          userId: 1, // ID de usuario (simulado)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newClass = {
          id: data.id,
          title: data.title,
          body: data.body,
          instructor: 'Instructor Name', // Agrega nombre del instructor si es necesario
        };
        setClasses([...classes, newClass]);
        setNewClassName(''); // Limpia el campo después de agregar la clase
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
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${editingClass.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingClass),
      });

      if (response.ok) {
        const updatedClasses = classes.map((classItem) =>
          classItem.id === editingClass.id ? editingClass : classItem
        );
        setClasses(updatedClasses);
        setIsEditing(false);
        setEditingClass(null);
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
      <input
        type="text"
        value={newClassName}
        onChange={(e) => setNewClassName(e.target.value)}
        placeholder="Nuevo nombre de clase"
      />
      <button onClick={handleAddClass}>Agregar Clase</button>
      <ul>
        {classes?.map((classItem) => (
          <li key={classItem.id}>
            <h1>ClassId: {classItem.id}</h1>
            <h3 onClick={() => handleEditClass(classItem)}>
              {isEditing && editingClass && editingClass.id === classItem.id ? (
                <input
                  type="text"
                  value={editingClass.title}
                  onChange={(e) =>
                    setEditingClass({
                      ...editingClass,
                      title: e.target.value,
                    })
                  }
                />
              ) : (
                classItem.title
              )}
            </h3>
            <p>{classItem.body}</p>
            {isEditing && editingClass && editingClass.id === classItem.id && (
              <button onClick={handleSaveEdit}>Guardar</button>
            )}
           <br/>
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
        initialClasses: [],
      },
    };
  }
}

export default Listing;
