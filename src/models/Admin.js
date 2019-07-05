import Model from '@team-decorate/alcjs'

const FILLABEL = [
    'id', 'name', 'email', 'password'
]

export default class Admin extends Model{

    constructor (data = null) {
        super()
        this.fillable = FILLABEL

        this.id = 0
        this.name = ''
        this.email = ''
        this.password = ''
        this.type = 0

        this.data = data
    }

    get _model () {
        return 'Admin'
    }

    get isDeveloper() {
        return this.type
    }

}
