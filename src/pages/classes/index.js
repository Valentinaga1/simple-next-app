import fetchDataFromAPI from '@/services/fetchingData';
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
        {classes.map((classItem) => ( // Eliminado '.classes?' ya que 'classes' es un array
          <li key={classItem.id} onClick={() => handleClassClick(classItem)} style={{ cursor: 'pointer' }}>
            <br/>
            <h1>{classItem.title}</h1> {/* 'name' cambiado a 'title' según la estructura de JSONPlaceholder */}
            <p>{classItem.body}</p> {/* 'content' cambiado a 'body' según la estructura de JSONPlaceholder */}
            {/* 'instructor' según la estructura de tu API */}
            {/* Agrega otras propiedades si son necesarias */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const data = await fetchDataFromAPI();

    return {
      props: {
        classes: data || [], // Enviar datos a la página como props
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        classes: [], // Enviar un array vacío en caso de error
      },
      revalidate: 60,
    };
  }
}

export default Classes;
