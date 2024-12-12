export interface IProductDetails {
    productId: number;
    image: string;//url
    name: string;
    price: number;
    description: string;
    size: number;
    reviews: number;
    inStock: boolean;
    category: string;
    subcategory: string;
    quantity: number;//used to check if in stock & insale
}

interface PhoneProduct extends IProductDetails {
    category: "Phone";
}

interface LaptopProduct extends IProductDetails {
    category: "Laptop";
}

interface ComputerProduct extends IProductDetails {
    category: "Computer";
}

interface SmartWatchProduct extends IProductDetails {
    category: "SmartWatch";
}

interface CameraProduct extends IProductDetails {
    category: "Camera";
}

interface HeadphoneProduct extends IProductDetails {
    category: "Headphone";
}

interface GamingProduct extends IProductDetails {
    category: "Gaming";
}

interface AccessoriesProduct extends IProductDetails {
    category: "Accessories";
}

export type ProductCategory = PhoneProduct | LaptopProduct | ComputerProduct | SmartWatchProduct | CameraProduct | HeadphoneProduct | GamingProduct | AccessoriesProduct;

export interface CategoryData { 
   id: number | string; 
} 


