import path from 'path';
import fs from 'fs/promises';

const DynamicPage = (props) => {
  const { loadedProduct } = props;

  return (
    <li>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </li>
  );
};

export async function getStaticProps(context) {
  console.log('hello from the backend 2');

  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy.data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: 'p1' } },
      { params: { pid: 'p2' } },
      { params: { pid: 'p3' } },
      { params: { pid: 'p4' } },
    ],
    fallback: false,
  };
}

export default DynamicPage;
