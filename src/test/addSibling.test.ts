import {GqlBuilder} from "..";
import {expect, should, assert} from "chai";
import {QueryField} from "../lib/QueryField";

describe('GqlBuilder addSibling Property Test Suits', function () {

    let qb: GqlBuilder;
    beforeEach(() => {
        qb = new GqlBuilder();
    });

    it('Should be created GqlBuilder', () => {
        should().exist(qb);
    });

    it('Should be working "addField" function usage 1', () => {
        qb.addSibling('user');
        expect(qb.fields['user'].parent.name).equal('');
        expect(qb.fields['user']).instanceOf(QueryField);
    });

    it('Should be working "addField" function usage 2', () => {
        qb.addSibling(['user']);
        expect(qb.fields['user'].parent.name).equal('');
        expect(qb.fields['user']).instanceOf(QueryField);
    });

    it('Should be working "addField" function usage 3', () => {
        qb.addSibling({name: 'user', fields: ['id']});
        expect(qb.fields['user'].fields['id'].parent.name).equal('user');
        expect(qb.fields['user']).instanceOf(QueryField);
    });

    it('Should be working "addField" function usage 4', () => {
        qb.addSibling({name: 'user', fields: ['id'], filters: {id: 'Int'}});
        const user = qb.fields['user'];
        expect(user.fields['id'].parent.name).equal('user');
        expect(user.filters.id).equal('Int');
        expect(user).instanceOf(QueryField);
    });

    it('Should be working "addField" function usage 5', () => {
        qb.addSibling({name: 'user', fields: ['id'], filters: {gender: 'Int', name: 'String'}});
        const user = qb.fields['user'];
        expect(user).instanceOf(QueryField);
        expect(user.fields['id'].parent.name).equal('user');
        expect(user.filters.gender).equal('Int');
        expect(user.filters.name).equal('String');
    });

    it('Should be working "addField" function usage 6', () => {
        qb.addSibling({name: 'user', fields: ['id', 'name', 'gender'], filters: {gender: 'Int', name: 'String'}});
        const user = qb.fields['user'];
        expect(user).instanceOf(QueryField);
        expect(user.fields['id'].name).equal('id');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['gender'].name).equal('gender');
        expect(user.filters.gender).equal('Int');
        expect(user.filters.name).equal('String');
    });

    it('Should be working "addField" for multiple fields usage 1', () => {
        qb.addSibling(['user', 'person', {name: 'job'}]);
        expect(qb.fields['person']).instanceOf(QueryField);
        expect(qb.fields['user']).instanceOf(QueryField);
        expect(qb.fields['job']).instanceOf(QueryField);
        expect(qb.fields['job'].name).equal('job');
    });

    it('Should be working "addField" for multiple fields usage 2', () => {
        qb.addSibling(['user', 'person', {name: 'address', fields: ['state', 'city', 'country']}]);
        const address = qb.fields['address'];
        expect(qb.fields['user']).instanceOf(QueryField);
        expect(qb.fields['person']).instanceOf(QueryField);
        expect(address).instanceOf(QueryField);
        expect(address.fields['state'].name).equal('state');
        expect(address.fields['city'].name).equal('city');
        expect(address.fields['country'].name).equal('country');
    });

    it('Should be working "addField" for multiple sub fields usage 3', () => {
        qb.addSibling(['user', 'person', {name: 'address', fields: ['state', 'city', 'country']}]);
        const address = qb.fields['address'];
        expect(qb.fields['user']).instanceOf(QueryField);
        expect(qb.fields['person']).instanceOf(QueryField);
        expect(address).instanceOf(QueryField);
        expect(address.fields['state'].name).equal('state');
        expect(address.fields['city'].name).equal('city');
        expect(address.fields['country'].name).equal('country');
    });

    it('Should be working "addField" for multiple sub fields usage 4', () => {
        qb.addSibling(['user', 'person',
            {
                name: 'address', fields: ['state', 'city',
                    {name: 'country', fields: ['code', 'name']}]
            }]);
        const address = qb.fields['address'];
        expect(address.fields['country'].name).equal('country');
        expect(address.fields['country'].fields['code'].name).equal('code');
        expect(address.fields['country'].fields['name'].name).equal('name');
    });


    it('Should be working "addField" function usage 12', () => {
        qb.addSibling('user', ['id', 'name']);
        expect(qb.fields['user'].parent.name).equal('');
        expect(qb.fields['user']).instanceOf(QueryField);
    });

    describe('Exception Controls', () => {

        it('Should control missing field name', () => {
            try {
                qb.addSibling(['user', {}, {name: '', fields: ['state', 'city', 'country']}]);
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

        it('Should control wrong field type', () => {
            try {
                qb.addSibling(['user', ['person']]);
            } catch (err) {
                expect(err).equal('Not supported field type');
            }
        });

        it('Should control wrong field type', () => {
            try {
                qb.addSibling({});
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });
    });


});
