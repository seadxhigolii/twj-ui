export interface Product {
    id: string; 
    productName: string;
    description: string;
    vendorName: string;
    categoryId: string;
    avgRating: number;
    totalRatings: number;
    price: number;
    currency: string;
    affiliateLink: string;
    image: string; 
    promotionStart: Date;
    promotionEnd: Date;
}