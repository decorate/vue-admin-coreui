
// Containers
const DefaultContainer = () => import('../containers/DefaultContainer').then(m => m.default || m)

// Views
const Dashboard = () => import('../views/Dashboard').then(m => m.default || m)


// Views - Pages
const Page404 = () => import('../views/pages/Page404').then(m => m.default || m)
const Page500 = () => import('../views/pages/Page500').then(m => m.default || m)
const Login = () => import('../views/pages/Login').then(m => m.default || m)
const Register = () => import('../views/pages/Register').then(m => m.default || m)

// Users
const Users = () => import('../views/users/Users').then(m => m.default || m)
const User = () => import('../views/users/User').then(m => m.default || m)
export default [

    {
        path: '/admin/',
        redirect: '/admin/dashboard',
        name: 'home',
        component: DefaultContainer,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'users',
                meta: {label: 'Users'},
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: '',
                        component: Users,
                    },
                    {
                        path: ':id',
                        meta: {label: 'User Details'},
                        name: 'User',
                        component: User,
                    },
                ]
            },
        ],
    },
    {
        path: '/admin/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
            render (c) { return c('router-view') }
        },
        children: [
            {
                path: '404',
                name: 'page404',
                component: Page404
            },
            {
                path: '500',
                name: 'page500',
                component: Page500
            },
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'register',
                name: 'register',
                component: Register
            }
        ]
    },


    { path: '*', component: () => import(
            /* webpackChunkName: "errors_404" */
            '../views/pages/Page404'
            ).then(m => m.default || m) }
]
