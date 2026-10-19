
import Product from "../models/products.model.js"; // 1.

/* fetch all products ---GET - api/v1/products */
const fetchAllProducts = async (req, res) => {
    try {
        // 2. Variable ka naam Products rakhein taaki clash na ho
        const Products = await Product.find(); // find = SELECT * FROM PRODUCTS

        // 3. Check karein ke products milay hain ya nahi
        if (Products.length > 0) {
            return res.status(200).json({
                ok: true,
                products: Products,
                total: `there is ${Product.length} is our database `
            });
        } else {
            return res.status(404).json({
                ok: false,
                error: 'No products found!'
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            ok: false,
            error: 'Server Error'
        });
    }
};

/*2: Add new products into db --- POST -api/v1/products */
/*2: Add new products into db --- POST -api/v1/products */
const addNewProducts = async (req, res) => {
    try {
        // Image aur description ko bhi req.body se lazmi grab karein
        const { title, brand, category, price, description, image } = req.body;
        console.log({ title, brand, category, price, description, image });

        const product = new Product({
            title,
            brand,
            category,
            price,
            description,
            image // Yeh ab database mein direct save ho gi
        });  

        await product.save(); // Await lagana zaroori hai taake database mein properly save ho

        res.status(201).json({
            ok: true,
            message: 'Products added successfully',
            product
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
};
/*3: fetch single products by id ---> GET  */
const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('here we getting id from url', id);

        // Database se ID ke zariye product find karein
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                ok: false,
                message: `Product not found: ${id}`
            });
        }

        // Frontend ko product ka data wapas bhejein
        return res.status(200).json({
            ok: true,
            product
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            ok: false,
            error: 'Server Error'
        });
    }
};

/*4: Update exsisiting product by ID  PUT Method  */
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {new: true} /// updated and saved
        )
         if (!updatedProduct) {
            return res.status(404).json({
                ok: false,
                message: `Product not found: ${id}`
            });
        }

        res.status(200).json({
            ok: true,
            message: `Product updated successfully: ${id}`
        });
    } catch (err) {
        console.log(err.message)
    }
}

/*5: delete exsisiting product by ID  DELETE Method  */
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id; // grab id from url

        // Yahan ID pass karna zaroori hai
        const deletedProduct = await Product.findByIdAndDelete(id); 

        if (!deletedProduct) {
            return res.status(404).json({
                ok: false,
                message: `Product not found: ${id}`
            });
        }

        res.status(200).json({
            ok: true,
            message: `Product deleted successfully: ${id}`
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            ok: false,
            message: err.message
        });
    }
};
export {
    fetchAllProducts,
    addNewProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    
};



/* online cloude system() Mongodb -----> scheema(model) ------->controller -----> routes ----> server.js  */



/*
https://www.mariab.pk/cdn/shop/files/D-6_Front_A_9b69e7de-e2fc-4e7b-825f-ba60e8df126c.jpg?v=1779281350
https://www.mariab.pk/cdn/shop/files/D-6_Closeup_E_a95e31b0-5e3d-4ca9-9b4c-2e0b7f774bbb.jpg?v=1779281350
https://www.mariab.pk/cdn/shop/files/D-6_Closeup_F_4bd8e040-6e4b-48f1-9467-18c467df25c3.jpg?v=1779281398
https://www.mariab.pk/cdn/shop/files/D-6_Front_B.jpg?v=1779281349
https://www.mariab.pk/cdn/shop/files/D-6_Side_C.jpg?v=1779281397
https://www.mariab.pk/cdn/shop/files/D-6_Back_D.jpg?v=1779281350
https://www.mariab.pk/cdn/shop/files/D-6_c2be031b-a3ff-41c8-a9bc-2c500d72c875.jpg?v=1779281398









*/