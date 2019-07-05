<template>
    <b-row>
        <b-col cols="12" xl="6">
            <transition name="slide">
                <b-card>
                    <div slot="header" v-html="caption"></div>
                    <b-table
                            :hover="hover"
                            :striped="striped"
                            :bordered="bordered"
                            :small="small"
                            :fixed="fixed"
                            responsive="sm"
                            :items="paginate.data"
                            :fields="fields"
                            @row-clicked="rowClicked">
                        <template slot="id" slot-scope="data">
                            <strong>{{data.item.id}}</strong>
                        </template>
                        <template slot="name" slot-scope="data">
                            <strong>{{data.item.name}}</strong>
                        </template>
                        <template slot="status" slot-scope="data">
                            <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
                        </template>
                    </b-table>
                    <nav>
                        <v-paginate :paginate="paginate"></v-paginate>
                    </nav>
                </b-card>
            </transition>
        </b-col>
    </b-row>
</template>

<script>
    import usersData from './UsersData'
    import Paginate from '../../models/Paginate'
    import User from '../../models/User'
    import axios from 'axios'
    import VPaginate from '../../components/Paginate'

    export default {
        name: 'Users',

        props: {
            caption: {
                type: String,
                default: 'Users'
            },
            hover: {
                type: Boolean,
                default: true
            },
            striped: {
                type: Boolean,
                default: true
            },
            bordered: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            fixed: {
                type: Boolean,
                default: false
            }
        },

        data: () => {
            return {
                fields: [
                    {key: 'id'},
                    {key: 'name'},
                    {key: 'registered'},
                    {key: 'role'},
                    {key: 'status'}
                ],
                paginate: new Paginate().setModel(new User())
            }
        },

        async created() {
            //const { data } = await axios.get('/admin/users')
            const data = [
                {id: 1, name: 'test1'},
                {id: 2, name: 'test2'},
                {id: 3, name: 'test3'},
                {id: 4, name: 'test4'},
            ]
            this.paginate.create({data: data})
            console.log(this.paginate)
        },

        computed: {
        },

        methods: {
            getBadge (status) {
                return status === 'Active' ? 'success'
                    : status === 'Inactive' ? 'secondary'
                        : status === 'Pending' ? 'warning'
                            : status === 'Banned' ? 'danger' : 'primary'
            },
            userLink (id) {
                return `users/${id.toString()}`
            },
            rowClicked (item) {
                const userLink = this.userLink(item.id)
                this.$router.push({path: userLink})
            }

        },

        components: {
            VPaginate,
        },

    }
</script>

<style scoped>
    .card-body >>> table > tbody > tr > td {
        cursor: pointer;
    }
</style>
