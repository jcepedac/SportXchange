import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
//firebase
import useFetchDocument from "../../hooks/useFetchDocument";

import SellerOrderDetailsComponent from "../../components/orderDetailsComponent/SellerOrderDetailsComponent";

const SellerOrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);
  console.log(order);
  return (
    <>
      {order === null ? (
        <Loader />
      ) : (
        <div className="w-full mx-auto px-2 lg:w-9/12 md:px-6 mt-6 ">
          <SellerOrderDetailsComponent
            order={order}
            seller={true}
            admin={false}
          />
        </div>
      )}
    </>
  );
};

export default SellerOrderDetails;
