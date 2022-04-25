const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
};

const ProductRow = ({ stocked, name, price }) => {
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

const ProductTable = ({ filterText, inStockOnly, products }) => {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    const { name, stocked, category } = product;

    if (name.indexOf(filterText) === -1) {
      return;
    }

    if (inStockOnly && !stocked) {
      return;
    }

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

const SearchBar = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockChange,
}) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => handleFilterTextChange(e.target.value)}
      />
      <p>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => handleInStockChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </p>
    </form>
  );
};

const FilterableProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleFilterTextChange = (filterText) => {
    setFilterText(filterText);
  };

  const handleInStockChange = (inStockOnly) => {
    setInStockOnly(inStockOnly);
  };

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
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
