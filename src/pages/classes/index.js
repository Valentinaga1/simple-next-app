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
            <h1><b>Class Id: </b> {classItem.id}</h1>
            <h3>{classItem.title}</h3> 
            <p>{classItem.body}</p> 
            <p><b>Instructor: </b>{classItem.instructor}</p>
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
      revalidate: 5,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        classes: [], // Enviar un array vacío en caso de error
      },
      revalidate: 5,
    };
  }
}

export default Classes;
