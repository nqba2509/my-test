"use client";
import { useEffect, useMemo, useState } from "react";



const products = [
  {
    id: 1,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 1",
    price: 10000,
    quantity: 1,
  },
  {
    id: 2,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 2",
    price: 50000,
    quantity: 1,
  },
  {
    id: 3,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 3",
    price: 50000,
    quantity: 1,
  },
  {
    id: 4,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 4",
    price: 50000,
    quantity: 1,
  },
  {
    id: 5,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 5",
    price: 50000,
  },
  {
    id: 6,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 6",
    price: 10000,
    quantity: 1,
  },
  {
    id: 7,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 7",
    price: 50000,
    quantity: 1,
  },
  {
    id: 8,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 8",
    price: 50000,
    quantity: 1,
  },
  {
    id: 9,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 9",
    price: 50000,
    quantity: 1,
  },
  {
    id: 10,
    img: "https://whoovietnam.com/wp-content/uploads/2023/12/set-dau-goi-xa-ohui-clear-science-hair-care-4pcs-w_3-600x600.jpg",
    name: "Sản phẩm 10",
    price: 50000,
    quantity: 1,
  },
];

type List = {
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
};

const cart = () => {
  const [listItems, setListItems] = useState<any>([]);
  const [cart, setCart] = useState<List[]>([]);
  const [NameItem, setNameItem] = useState("");
  const [PriceItem, setPriceItem] = useState("");
  const [ImgItem, setImgItem] = useState("");
  const [cartProduct, setCartProduct] = useState([...products]);


   

  const handleAddItem = () => {
    const newList = [
      ...listItems,
      { img: ImgItem, name: NameItem, price: PriceItem },
    ];
    setListItems(newList);
  };

  const handleAddCart = (product: any) => {
    //hàm existingProductIndex để kiểm tra xem item đã có tồn tại trong mảng không , có thì return 0 , không có thì return -1
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    //nếu hàm existringProductIndex trả về 0 (có tồn tại) khác -1 thì giá trị key quantity + thêm 1.
    if (existingProductIndex !== -1) {
      const newCart = [...cart];
      const foundProduct = newCart[existingProductIndex];
      newCart[existingProductIndex] = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };
      setCart(newCart);
    } else {
      //nếu hàm existringProductIndex trả về -1 (không tồn tại) thêm item mới vào mảng cart có key quantity = 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handlleDeteleItem = (itemId: number) => {
    const updateCart = cart.filter((item) => item.id !== itemId);
    setCart(updateCart);
  };

  const total = useMemo(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  }, [cart]);

  const handleEditCart = (productId : number) => {
    const editJob = [...cart]
    const a = [...cartProduct]
    console.log(editJob)
    for (let i = 0; i < cart.length; i++) {
      if(cart[i].id === productId) {
        a[i].name = NameItem
        editJob[i].name = NameItem
        break
      }
    }
    setCartProduct(a)
    setCart(editJob)
    console.log(editJob)
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>List Item</h1>
          <label htmlFor="">Name Item </label>
          <input
            type="text"
            value={NameItem}
            onChange={(e) => setNameItem(e.target.value)}
          />
          <label htmlFor="">Price Item </label>
          <input
            type="number"
            value={PriceItem}
            onChange={(e) => setPriceItem(e.target.value)}
          />
          <label htmlFor="">Img Item </label>
          <input
            type="text"
            value={ImgItem}
            onChange={(e) => setImgItem(e.target.value)}
          />
          <button onClick={handleAddItem}>Add Item</button>

          <ul style={{ display: "flex", flexDirection: "column" }}>
            {cartProduct.map((product) => (
              <li
                key={product.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                  border: "1px solid",
                }}
              >
                <img
                  style={{
                    width: "100px",
                  }}
                  src={product.img}
                  alt={product.name}
                ></img>
                <h3>Name:{product.name}</h3>
                <p>Price:{product.price}</p>
                <button
                  onClick={() => {
                    handleAddCart(product);
                  }}
                >
                  Add Cart
                </button>
                <button
                  onClick={() => {
                    handleEditCart(product.id);
                  }}
                >
                  EditCart
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Cart Item</h1>
          <ul style={{ display: "flex", flexDirection: "column" }}>
            {cart.map((item) => (
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                  border: "1px solid",
                }}
                key={item.id}
              >
                <img
                  style={{
                    width: "100px",
                  }}
                  src={item.img}
                ></img>
                <h3>Name: {item.name}</h3>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handlleDeteleItem(item.id)}>
                  Detele
                </button>
              </li>
            ))}
          </ul>
          <h2>Total Price : {total}</h2>
        </div>
      </div>
    </>
  );
};

export default cart;
