export interface GetFilteredBlogPostModel {
    id: string;
    title: string;
    userId: string; 
    productCategoryId: string; 
    blogPostCategoryId: string;
    tags: string;
    image: string;
    views: number;
    likes: number;
    dislikes: number;
    numberOfComments: number;
    productId?: string;
    authorName: string;
    authorImage: string;
    url: string;
    createdAt: Date;
}
