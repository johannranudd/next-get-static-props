import path from 'path';
import fs from 'fs/promises';

const DynamicPage = (props) => {
  const { loadedProduct } = props;
  // console.log(loadedProduct);

  return (
    <li>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </li>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy.data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  console.log('hello from the backend 2');

  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const dataIds = data.products.map((product) => {
    return product.id;
  });
  console.log('ids', dataIds);
  const newPath = dataIds.map((id) => {
    return { params: { pid: id } };
  });
  console.log('newPath', newPath);

  return {
    paths: newPath,
    fallback: false,
  };
}

export default DynamicPage;
