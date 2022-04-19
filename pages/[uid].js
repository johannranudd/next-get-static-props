const UserIdPage = (props) => {
  const { id } = props;
  return <div>{id}</div>;
};

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: 'user-id-' + userId,
    },
  };
}

export default UserIdPage;
