import HomePage from '../pages/home.vue';
import NotFoundPage from '../pages/404.vue';
import Story from '../pages/story';
import User from '../pages/user';
import Comment from '../pages/comment';

const routes = [
    {
        path: '/story/:id',
        component: Story,
    },
    {
        path: '/user/:id',
        component: User,
    },
    {
        path: '/comment/:child',
        component: Comment,
    },
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;
