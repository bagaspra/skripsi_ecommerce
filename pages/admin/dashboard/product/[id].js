import styles from "../../../../styles/products.module.scss";
import Layout from "../../../../components/admin/layout";
import db from "../../../../utils/database";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SingularSelect from "../../../../components/selects/SingularSelect";
import MultipleSelect from "../../../../components/selects/MultipleSelect";
import AdminInput from "../../../../components/inputs/adminInput";
import DialogModal from "../../../../components/dialogModal";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/DialogSlice";
import Images from "../../../../components/admin/createProduct/images";
import Colors from "../../../../components/admin/createProduct/colors";
import Style from "../../../../components/admin/createProduct/style";
import Sizes from "../../../../components/admin/createProduct/clickToAdd/Sizes";
import Details from "../../../../components/admin/createProduct/clickToAdd/Details";
import Questions from "../../../../components/admin/createProduct/clickToAdd/Questions";
import { validateEditProduct } from "../../../../utils/validation";
import dataURItoBlob from "../../../../utils/dataURItoBlob";
import { uploadImages } from "../../../../requests/upload";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import { useRouter } from "next/router";

const initialState = {
    name: "",
    description: "",
    brand: "",
    sku: "",
    discount: 0,
    images: [],
    description_images: [],
    parent: "",
    category: "",
    subCategories: [],
    color: {
        color: "",
        image: "",
    },
    sizes: [
        {
            size: "",
            qty: "",
            price: "",
        },
    ],
    details: [
        {
            name: "",
            value: "",
        },
    ],
    questions: [
        {
            question: "",
            answer: "",
        },
    ],
    shippingFee: "",
};

function EditProductPage({ parents, categories }) {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(initialState);
    const [subs, setSubs] = useState([]);
    const [colorImage, setColorImage] = useState("");
    const [images, setImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedParent, setSelectedParent] = useState('');
    const [sizes, setSizes] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            axios.get(`/api/product/${id}`)
                .then((response) => {
                    const productData = response.data;
                    const { images } = response.data;
                    const imageUrls = images.map((image) => image.url);
                    setImages(imageUrls);
                    setProduct(productData);
                    setSelectedCategory(productData.category);
                    const newSizeData = {
                        size: productData.size,
                        qty: productData.quantity,
                        price: productData.price,
                    };
                    setSizes([newSizeData]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    useEffect(() => {
        const getParentData = async () => {
            try {
                const { data } = await axios.get(`/api/product/${product.parent}`);
                if (data) {
                    setSelectedParent(data._id);
                    setProduct({
                        ...product,
                        name: data.name,
                        description: data.description,
                        brand: data.brand,
                        category: data.category,
                        subCategories: data.subCategories,
                        questions: [],
                        details: [],
                    });
                }
            } catch (error) {

            }
        };
        getParentData();
    }, [product.parent]);
    useEffect(() => {
        async function getSubs() {
            const { data } = await axios.get("/api/admin/subCategory", {
                params: {
                    category: product.category,
                },
            });
            setSubs(data);
        }
        getSubs();
    }, [product.category]);
    const handleChange = (e) => {
        const { value, name } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const validate = Yup.object({
        name: Yup.string()
            .required("Please add a name")
            .min(10, "Product name must bewteen 10 and 300 characters.")
            .max(300, "Product name must bewteen 10 and 300 characters."),
        brand: Yup.string().required("Please add a brand"),
        category: Yup.string().required("Please select a category."),
        /*
        subCategories: Yup.array().min(
          1,
          "Please select atleast one sub Category."
        ),
       */
        sku: Yup.string().required("Please add a sku/number"),
        description: Yup.string().required("Please add a description"),
    });

    const editProduct = async () => {
        let test = validateEditProduct(product, images);
        if (test == "valid") {
            editProductHandler();
        } else {
            dispatch(
                showDialog({
                    header: "Please follow our instructions.",
                    msgs: test,
                })
            );
        }
    };
    let uploaded_images = [];
    let style_img = "";

    const editProductHandler = async () => {
        setLoading(true);
        if (images) {
            let temp = images.map((img) => {
                return dataURItoBlob(img);
            });
            const path = "product images";
            let formData = new FormData();
            formData.append("path", path);
            temp.forEach((image) => {
                formData.append("file", image);
            });
            uploaded_images = await uploadImages(formData);
        }
        if (product.color.image) {
            let temp = dataURItoBlob(product.color.image);
            let path = "product style images";
            let formData = new FormData();
            formData.append("path", path);
            formData.append("file", temp);
            let cloudinary_style_img = await uploadImages(formData);
            style_img = cloudinary_style_img[0].url;
        }
        try {
            const { data } = await axios.put(`/api/product/${id}`, {
                ...product,
                sizes,
                images: uploaded_images,
                color: {
                    image: style_img,
                    color: product.color.color,
                },
            });
            setLoading(false);
            toast.success(data.message);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    return (
        <Layout>
            <div className={styles.header}>Edit Product</div>
            <Formik
                enableReinitialize
                initialValues={{
                    name: product.name,
                    brand: product.brand,
                    description: product.description,
                    category: product.category,
                    subCategories: product.subCategories,
                    parent: product.parent,
                    sku: product.sku,
                    discount: product.discount,
                    color: product.color.color,
                    imageInputFile: "",
                    styleInout: "",
                }}
                validationSchema={validate}
                onSubmit={() => {
                    editProduct();
                }}
            >
                {(formik) => (
                    <Form>
                        <Images
                            name="imageInputFile"
                            header="Product Carousel Images"
                            text="Add images"
                            images={images}
                            setImages={setImages}
                            setColorImage={setColorImage}
                        />
                        <div className={styles.flex}>
                            {product.color.image && (
                                <img
                                    src={product.color.image}
                                    className={styles.image_span}
                                    alt=""
                                />
                            )}
                            {product.color.color && (
                                <span
                                    className={styles.color_span}
                                    style={{ background: `${product.color.color}` }}
                                ></span>
                            )}
                        </div>
                        <Colors
                            name="color"
                            product={product}
                            setProduct={setProduct}
                            colorImage={colorImage}
                        />
                        {/* <Style
                            name="styleInput"
                            product={product}
                            setProduct={setProduct}
                            colorImage={colorImage}
                        /> */}
                        <SingularSelect
                            name="parent"
                            value={selectedParent}
                            placeholder="Parent product"
                            data={parents}
                            header="Add to an existing product"
                            handleChange={handleChange}
                        />
                        <SingularSelect
                            name="category"
                            value={selectedCategory}
                            placeholder="Category"
                            data={categories}
                            header="Select a Category"
                            handleChange={handleChange}
                            disabled={product.parent}
                        />
                        {product.category && (
                            <MultipleSelect
                                value={product.subCategories}
                                data={subs}
                                header="Select SubCategories"
                                name="subCategories"

                                handleChange={handleChange}
                            />
                        )}
                        <div className={styles.header}>Basic Infos</div>
                        <AdminInput
                            type="text"
                            label="Name"
                            name="name"
                            value={product.name}
                            placholder="Product name"
                            onChange={handleChange}
                        />
                        <AdminInput
                            type="text"
                            label="Description"
                            name="description"
                            placholder="Product description"
                            value={product.description}
                            onChange={handleChange}
                        />
                        <AdminInput
                            type="text"
                            label="Brand"
                            name="brand"
                            placholder="Product brand"
                            value={product.brand}
                            onChange={handleChange}
                        />
                        <AdminInput
                            type="text"
                            label="Sku"
                            name="sku"
                            value={product.sku}
                            placholder="Product sku/ number"
                            onChange={handleChange}
                        />
                        <AdminInput
                            type="text"
                            label="Discount"
                            name="discount"
                            value={product.discount}
                            placholder="Product discount"
                            onChange={handleChange}
                        />
                        <Sizes
                            sizes={sizes}
                            product={product}
                            value={sizes}
                            setProduct={setProduct}
                        />
                        <Details
                            details={product.details}
                            value={product.details}
                            product={product}
                            setProduct={setProduct}
                        />
                        <Questions
                            questions={product.questions}
                            product={product}
                            value={product.questions}
                            setProduct={setProduct}
                        />
                        <button
                            className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
                            type="submit"
                        >
                            Edit Product
                        </button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );

}

export async function getServerSideProps({ params, ctx }) {
    db.connectDb();
    const results = await Product.find().select("name subProducts").lean();
    const categories = await Category.find().lean();
    db.disconnectDb();
    return {
        props: {
            parents: JSON.parse(JSON.stringify(results)),
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}

export default EditProductPage;