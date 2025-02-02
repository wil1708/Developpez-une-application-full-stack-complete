import { Article } from "./article.interface";
import { User } from "./user.interface";

export interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    articleDto: Article;
    userDto: User;
}