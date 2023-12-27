import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Classes = ({ classes }) => {
  const router = useRouter();

  const handleClassClick = (classItem) => {
    router.push(`/classes/${classItem.id}`);
  };
  return (
    <div>
      <h1>Classes:</h1>
      <ul>
        {classes.classes?.map((classItem) => (
          <li key={classItem.id} onClick={() => handleClassClick(classItem)} style={{ cursor: 'pointer' }}>
            <br/>
            <h1>{classItem.name}</h1>
            <p>{classItem.content}</p>
            <p><b>Instructor: </b>{classItem.instructor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  // Realizar la solicitud a la API para obtener las clases
  const res = await fetch('http://localhost:3000/api/classes'); // Ajusta la URL de la API según tu configuración
  const data = await res.json();

  return {
    props: {
      classes: data || [], // Enviar datos a la página como props
    },
    revalidate: 60,
  };
}

export default Classes;

