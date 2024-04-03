import React, { useState } from "react";
import { db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeProducts } from "../../redux/slice/productSlice";
import { serverTimestamp } from "firebase/firestore";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";
const PostAD = () => {
  const { userId } = useSelector((store) => store.auth);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [otherBrand, setOtherBrand] = useState("");
  const [isOtherBrand, setIsOtherBrand] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    if (selectedBrand === "Other") {
      setIsOtherBrand(true);
    } else {
      setIsOtherBrand(false);
      setBrand(selectedBrand);
    }
  };

  const handleOtherBrandChange = (e) => {
    setOtherBrand(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      window.alert("You must log in to post a product");
      return;
    }
    setLoading(true);
    setUploadStatus("Upload started");
    const finalBrand = isOtherBrand ? otherBrand : brand;
    const imageRef = ref(storage, `products/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const productsRef = collection(db, "products");
        const docRef = await addDoc(productsRef, {
          name,
          price,
          description,
          brand: finalBrand,
          imageURL: url,
          createdAt: serverTimestamp(),
          sellerId: userId,
        });

        const newProduct = {
          id: docRef.id,
          name,
          price,
          description,
          brand: finalBrand,
          imageURL: url,
          createdAt: serverTimestamp(),
          sellerId: userId,
        };

        const currentProducts =
          JSON.parse(localStorage.getItem("product")) || [];

        const updatedProducts = [...currentProducts, newProduct];

        dispatch(storeProducts({ products: updatedProducts }));
        localStorage.setItem("product", JSON.stringify(updatedProducts));

        setLoading(false);
        navigate("/all");
        setUploadStatus("Upload finished");
      });
    });
  };

  return (
    <>
      <div>
        <main className="w-full bg-gray-200 min-h-screen flex items-center justify-center">
          <div className="bg-white p-10 rounded shadow-lg">
            <Breadcrumbs />
            <section className="container mx-auto py-10">
              <h2 className="mb-6 text-2xl font-semibold text-center">
                Upload Product
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="input input-bordered w-full max-w-xs mx-auto block"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                    className="input input-bordered w-full max-w-xs mx-auto block"
                  />
                </div>
                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="textarea textarea-bordered w-full mx-auto block"
                    rows="3"
                  />
                </div>
                <div>
                  <select
                    value={isOtherBrand ? "Other" : brand}
                    onChange={handleBrandChange}
                    required
                    className="input input-bordered w-full max-w-xs mx-auto block"
                  >
                    <option value="">Select a brand</option>
                    <option value="Nike">Nike</option>
                    <option value="Adidas">Adidas</option>
                    <option value="Puma">Puma</option>
                    <option value="Yonex">Yonex</option>
                    <option value="Under Armour">Under Armour</option>
                    <option value="Reebok">Reebok</option>
                    <option value="New Balance">New Balance</option>
                    <option value="Asics">Asics</option>
                    <option value="Mizuno">Mizuno</option>
                    <option value="Wilson">Wilson</option>
                    <option value="Salomon">Salomon</option>
                    <option value="North Face">North Face</option>
                    <option value="Columbia">Columbia</option>
                    <option value="Merrell">Merrell</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {isOtherBrand && (
                  <div>
                    <input
                      type="text"
                      value={otherBrand}
                      onChange={handleOtherBrandChange}
                      placeholder="Enter your brand"
                      required
                      className="input input-bordered w-full max-w-xs mx-auto block"
                    />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    required
                    className="input input-bordered w-full max-w-xs mx-auto block"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default PostAD;
