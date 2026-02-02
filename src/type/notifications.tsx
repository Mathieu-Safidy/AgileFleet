export type Notification = {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'info' | 'alert' | 'success';
    isRead: boolean;
}
