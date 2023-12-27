import { useRouter } from 'next/router';

const ClassDetails = ({ classDetails }) => {
  // Renderiza los detalles de la clase utilizando 'classDetails'
  return (
    <div>
      <h1>Detalles de la clase</h1>
      <h1>{classDetails.name}</h1>
      <p>{classDetails.content}</p>
      <p><b>Instructor: </b>{classDetails.instructor}</p>
      {/* Renderiza otros detalles de la clase */}
    </div>
  );
};

export const getStaticPaths = async () => {
  const data = await fetch('http://localhost:3000/api/classes'); // Ajusta la URL de la API según tu configuración
  const classesData = await data.json();
  const paths = classesData.classes.map((classItem) => ({
    params: { id: classItem.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  // Lógica para obtener los detalles de la clase con el ID especificado
  const data = await fetch('http://localhost:3000/api/classes'); // Ajusta la URL de la API según tu configuración
  const classesData = await data.json();
  const classDetails = classesData.classes.find(
    (classItem) => classItem.id === parseInt(params.id)
  );

  return {
    props: {
      classDetails,
    },
    revalidate: 60,
  };
};

export default ClassDetails;