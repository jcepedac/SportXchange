import React, { useEffect, useState } from "react";
import { Breadcrumbs, ProductFilter, ProductList } from "../../components";
import Loader from "../../components/loader/Loader";

// custom Hook
import useFetchCollection from "../../hooks/useFetchCollection";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { storeProducts, getPriceRange } from "../../redux/slice/productSlice";
import ProductListposted from "../../components/Products/ProductListposted";

const Allproductsposted = () => {
	const { data, isLoading } = useFetchCollection("products");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(storeProducts({ products: data }));
		dispatch(getPriceRange({ products: data }));
	}, [dispatch, data]);

	const { products } = useSelector((store) => store.product);

	return (
		<>
			{isLoading && <Loader />}
			<main className="w-full">
				<Breadcrumbs />
				<section className="w-full mx-auto p-4 md:p-10 lg:w-9/12 md:px-6 flex h-full">
					
					<article className="flex-1">
						<ProductListposted products={products} />
					</article>
				</section>
			</main>
		</>
	);
};

export default Allproductsposted;
