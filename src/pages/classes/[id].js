import fetchDataFromAPI from '@/services/fetchingData';
import { useRouter } from 'next/router';

const ClassDetails = ({ classDetails }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Cargando...</p>;
  }

  if (!classDetails) {
    return <p>Clase no encontrada</p>;
  }

  return (
    <div>
      <h1>Detalles de la clase</h1>
      <h1>{classDetails.title}</h1>
      <p>{classDetails.body}</p>
      <p><b>Instructor: </b>{classDetails.instructor}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const classesData = await fetchDataFromAPI();
  const paths = classesData.map((classItem) => ({
    params: { id: classItem.id.toString() },
  }));

  return {
    paths,
    fallback: true, // fallback true para habilitar  ISR
  };
};

export const getStaticProps = async ({ params }) => {
  const classId = params.id;
  const classesData = await fetchDataFromAPI();

  if (!classesData) {
    return {
      notFound: true,
    };
  }

  const classDetails = classesData.find((classItem) => classItem.id === classId);

  if (!classDetails) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      classDetails,
    },
    revalidate: 60, 
  };
};

export default ClassDetails;
