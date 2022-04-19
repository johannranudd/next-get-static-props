import React from 'react';

const UserProfilePage = (props) => {
  const { username } = props;
  return <div>{username}</div>;
};

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log('req', req);
  console.log('res', res);
  return {
    props: { username: 'johann' },
  };
}
