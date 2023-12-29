import fetchDataFromAPI from '@/services/fetchingData';
import { useRouter } from 'next/router';

const ClassDetails = ({ classDetails }) => {
  if (!classDetails) {
    // Manejar caso cuando no hay detalles disponibles
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Detalles de la clase</h1>
      <h1>{classDetails.title}</h1>
      <p>{classDetails.body}</p>
      <p><b>Instructor: </b>{classDetails.instructor}</p>
      {/* Renderiza otros detalles de la clase si es necesario */}
    </div>
  );
};

export const getStaticPaths = async () => {
  // Obtiene los datos de la API para construir los paths
  const classesData = await fetchDataFromAPI();
  const paths = classesData.map((classItem) => ({
    params: { id: classItem.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  // Obtiene los detalles de una clase específica según el ID
  const classId = params.id;
  const classesData = await fetchDataFromAPI();

  if (!classesData) {
    return {
      notFound: true, // Manejar caso cuando no se encuentra la clase
    };
  }

  const classDetails = classesData.find((classItem) => classItem.id === classId);

  if (!classDetails) {
    return {
      notFound: true, // Manejar caso cuando no se encuentra la clase
    };
  }

  return {
    props: {
      classDetails,
    },
    revalidate: 5,
  };
};

export default ClassDetails;