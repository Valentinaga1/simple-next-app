import fetchDataFromAPI from '@/services/fetchingData';
import { useState, useEffect } from 'react';

const Listing = ({ initialClasses }) => {
  const [classes, setClasses] = useState(initialClasses);
  const [isEditing, setIsEditing] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [newClassName, setNewClassName] = useState('');

  const handleAddClass = async () => {
    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': "$2a$10$GF.kyelyQOUspc7OD9BxleTNlJ02uxvx5RI/ks.Ni./6jelYiGahS",
          'X-ACCESS-KEY': "$2a$10$lefvLSvygOssyPa6txdMKu/UakKiR/cHAzzD/u8IpHnSWveL3Te4y",
        },
        body: JSON.stringify({
          id: await fetchDataFromAPI().length + 1,
          title: newClassName,
          body: 'Some content here',
          instructor: 'Instructor Name',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newClass = {
          id: data.record.id,
          title: data.record.title,
          body: data.record.body,
          instructor: 'Instructor Name',
        };
        setClasses([...classes, newClass]);
        setNewClassName('');
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
      const response = await fetch(`https://api.jsonbin.io/v3/b/658ee01f266cfc3fde6ff58a/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': "$2a$10$GF.kyelyQOUspc7OD9BxleTNlJ02uxvx5RI/ks.Ni./6jelYiGahS",
          'X-ACCESS-KEY': "$2a$10$lefvLSvygOssyPa6txdMKu/UakKiR/cHAzzD/u8IpHnSWveL3Te4y",
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
            <p><b>Instructor: </b>{classItem.instructor}</p>
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
