export class BlogPostDto {
    id: string;
    title: string;
    authorName: string;
    imageURL: string;
    createdAt: Date;
    url: string;
  }
  
export class GetTopTagsBlogPostModel {
    tagName: string;
    tagID: string;
    blogPosts: BlogPostDto[];
}
  
export class CombinedBlogPostModel {
    latestPosts: BlogPostDto[];
    topTagsWithPosts: GetTopTagsBlogPostModel[];
}
  