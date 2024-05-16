export interface BlogPost {
    id: string;
    title: string;
    userId: string;
    createdAt: Date;
    categoryId: string;
    image: string;
    views: number;
    url: string;
    content: string;
    tags: string;
    authorName: string;
    authorImage: string;
}