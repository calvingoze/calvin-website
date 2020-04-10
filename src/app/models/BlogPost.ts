import { firestore } from 'firebase';

export interface BlogPost {
    id: string;
    title: string;
    date: Date;
    authorId: string;
    authorUrl?: string;
    authorName?: string;
    body: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    lastUpdated?: firestore.Timestamp;
    tags?: string[];
}