import { firestore } from 'firebase';

export interface BlogPost {
    id: string;
    title: string;
    date: Date;
    authorId: string;
    authorUrl?: string;
    body: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    LastUpdated?: firestore.Timestamp;
}