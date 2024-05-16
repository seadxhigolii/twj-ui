export class ProductDTO {
    id?: string; // Assuming BaseEntity<Guid> includes an ID
    productName: string;
    description: string;
    vendorName?: string;
    categoryId: string;
    avgRating?: number;
    totalRatings?: number;
    price?: number;
    currency?: string;
    affiliateLink: string;
    image: string; // Assuming this will be a base64 encoded string or a URL
    promotionStart?: Date;
    promotionEnd?: Date;
}