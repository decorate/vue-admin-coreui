import {Model, ArrayMappable}  from '@team-decorate/alcjs'

const FILLABEL = [
    'id',
    'name',
    'email',
    'password',
    'passwordConfirmation',
]

export default class User extends Model{

    constructor (data = null) {
        super()
        this.fillable = FILLABEL

        this.id = 0
        this.name = ''
        this.email = ''
        this.password = ''
        this.passwordConfirmation = ''

        this.data = data
    }

    get _model () {
        return 'User'
    }

}
