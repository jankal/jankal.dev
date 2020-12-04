export default interface BlogArticle {
  body: object;
  excerpt: string;
  title: string;
  description: string;
  dir: string;
  extension: string;
  path: string;
  slug: string;
  toc: [];
  createdAt: string;
  updatedAt: string;
  image?: string;
  tags?: string[];
}
