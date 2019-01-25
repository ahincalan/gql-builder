import {GqlBuilder} from "..";
import {expect, should} from "chai";


describe('GqlBuilder addParent Property Test Suits', function () {

    let qb: GqlBuilder;
    beforeEach(() => {
        qb = new GqlBuilder();
    });

    it('Should be created GqlBuilder', () => {
        should().exist(qb);
    });

    it('Should be working "addParent" function usage 1', () => {
        qb.addParent('user');
        expect(qb.fields['user'].name).equal('user');
    });

    it('Should be working "addParent" function usage 2', () => {
        qb.addParent('user', ['id', 'name']);
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['id'].name).equal('id');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
        expect(user.fields['id'].parent.name).equal('user');
    });

    it('Should be working "addParent" function usage 3', () => {
        qb.addParent('user', 'name');
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
    });

    it('Should be working "addParent" function usage 4', () => {
        qb.addParent('user', {name: 'name'});
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
    });

    it('Should be working "addParent" function usage 5', () => {
        qb.addParent('user', [{name: 'name'}]);
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
    });

    it('Should be working "addParent" function usage 6', () => {
        qb.addParent('user', [{name: 'name'}], {id: 'Int'});
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
        expect(user.filters['id']).equal('Int');
    });

    it('Should be working "addParent" function usage 7', () => {
        qb.addParent('user', [{name: 'name'}], {id: 'Int'}).addParent('person', ['id', 'name', {name: 'address'}]);
        const user = qb.fields['user'];
        const person = qb.fields['person'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
        expect(user.filters['id']).equal('Int');
        expect(person.name).equal('person');
        expect(person.fields['id'].name).equal('id');
        expect(person.fields['address'].name).equal('address');
    });


    it('Should be working "addParent" function usage 8', () => {
        qb.addParent('user', [{name: 'name'}], {id: 'Int'}).addParent('person', 'name');
        const user = qb.fields['user'];
        const person = qb.fields['person'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
        expect(user.filters['id']).equal('Int');
        expect(person.name).equal('person');
        expect(person.fields['name'].name).equal('name');

    });

    it('Should be working "addParent" function usage 9', () => {
        qb.addParent('user', [{name: 'name'}], {id: 'Int'}).addParent('person', {name: 'name'});
        const user = qb.fields['user'];
        const person = qb.fields['person'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
        expect(user.filters['id']).equal('Int');
        expect(person.name).equal('person');
        expect(person.fields['name'].name).equal('name');

    });

    it('Should be working "addParent" function usage 10', () => {
        qb.addParent('user', [{name: 'name'}], {id: 'Int'}).addParent('person', {name: 'name'}, {id: 'Int'});
        const user = qb.fields['user'];
        const person = qb.fields['person'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
        expect(user.fields['name'].parent.name).equal('user');
        expect(user.filters['id']).equal('Int');
        expect(person.name).equal('person');
        expect(person.fields['name'].name).equal('name');
        expect(person.filters['id']).equal('Int');

    });

    it('Should be working "addParent" function usage 11', () => {
        qb.addParent({name: 'user'});
        const user = qb.fields['user'];
        expect(user.name).equal('user');
    });

    describe('Exception Controls', () => {

        it('Should control missing field name 1', () => {
            try {
                qb.addParent('user', [{}], {id: 'Int'});
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

        it('Should control missing field name 2', () => {
            try {
                qb.addParent('user', {});
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

        it('Should control missing field name 3', () => {
            try {
                qb.addParent('user', [{name: 'id'}], {id: 'Int'}).addParent('person', [{}]);
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

        it('Should control missing field name 4', () => {
            try {
                qb.addParent('user', [{name: 'id'}], {id: 'Int'}).addParent('person', {});
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

        it('Should control missing field name 5', () => {
            try {
                qb.addParent({});
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

    });


});
