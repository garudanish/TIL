const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
};

const ProductRow = ({ product }) => {
  const { stocked, name, price } = product;

  const productName = stocked ? (
    name
  ) : (
    <span style={{ color: "red" }}>{name}</span>
  );

  return (
    <tr>
      <td>{productName}</td>
      <td>{price}</td>
    </tr>
  );
};

const ProductTable = ({ products }) => {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    const { category, name } = product;

    if (category !== lastCategory) {
      rows.push(<ProductCategoryRow category={category} key={category} />);
    }
    rows.push(<ProductRow product={product} key={name} />);
    lastCategory = category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const SearchBar = () => {
  return (
    <form>
      <input type="text" placeholder="Search ..." />
      <p>
        <input type="checkbox" /> Only show products in stock
      </p>
    </form>
  );
};

const FilterableProductTable = ({ products }) => {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
};

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("container")
);
