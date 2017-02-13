import { itemDefaults, itemTypes } from './';
const defaultQuestion = itemDefaults.get(itemTypes.QUESTION);

export default {
    title: '',
    type: '',
    basis: '',
    basisname: '',
    description: '',
    newAddition: 'bla bla bla',
    items: [
        defaultQuestion
    ]
}