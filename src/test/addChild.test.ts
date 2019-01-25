import {GqlBuilder} from "..";
import {expect, should} from "chai";


describe('GqlBuilder addChild Property Test Suits', function () {

    let qb: GqlBuilder;
    beforeEach(() => {
        qb = new GqlBuilder();
    });

    it('Should be created GqlBuilder', () => {
        should().exist(qb);
    });

    it('Should be working "addChild" function usage 1', () => {
        qb.addChild('user');
        expect(qb.fields['user'].name).equal('user');
    });

    it('Should be append array fields to child', () => {
        qb.addChild('user', ['id', 'name']);
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['id'].parent.name).equal('user');
        expect(user.fields['name'].parent.name).equal('user');
    });

    it('Should be append array fields to child and append filters', () => {
        qb.addChild('user', ['id', 'name'], {id: 'Int'});
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['id'].parent.name).equal('user');
        expect(user.fields['name'].parent.name).equal('user');
        expect(user.filters.id).equal('Int');
    });

    it('Should be append any[] fields to child and append filters', () => {
        qb.addChild('user', ['id', {name: 'name'}], {id: 'Int', gender: 'String'});
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['id'].parent.name).equal('user');
        expect(user.fields['name'].parent.name).equal('user');
        expect(user.filters.id).equal('Int');
        expect(user.filters.gender).equal('String');
    });

    it('Should be append complex fields to child', () => {
        qb.addChild('user', ['id', {name: 'name'},
            {name: 'country', fields: ['code', 'name']}]);
        const user = qb.fields['user'];
        const country = user.fields['country'];
        expect(user.name).equal('user');
        expect(user.fields['id'].parent.name).equal('user');
        expect(user.fields['name'].parent.name).equal('user');
        expect(country.fields['code'].name).equal('code');
        expect(country.fields['code'].parent.name).equal('country');
    });

    it('Should be append complex fields to child and append filters', () => {
        qb.addChild('user', ['id', {name: 'name'},
                {name: 'country', fields: ['code', 'name'], filters: {userId: 'Int'}}],
            {id: 'Int'});
        const user = qb.fields['user'];
        const country = user.fields['country'];
        expect(user.name).equal('user');
        expect(user.fields['id'].parent.name).equal('user');
        expect(user.fields['name'].parent.name).equal('user');
        expect(country.fields['code'].name).equal('code');
        expect(country.fields['code'].parent.name).equal('country');
        expect(country.filters['userId']).equal('Int');

    });

    it('Should be append object fields to child', () => {
        qb.addChild('user', {name: 'name'});
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
    });

    it('Should be append string fields to child', () => {
        qb.addChild('user', 'name');
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
    });

    it('Should be append string fields to child 2', () => {
        qb.addChild({name: 'user'});
        const user = qb.fields['user'];
        expect(user.name).equal('user');
    });

    it('Should be append chain fields to child', () => {
        qb.addChild('user').addChild('name');
        const user = qb.fields['user'];
        expect(user.name).equal('user');
        expect(user.fields['name'].name).equal('name');
    });

    describe('Exception Controls', () => {

        it('Should control missing field name 1', () => {
            try {
                qb.addChild('user', {});
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

        it('Should control missing field name 2', () => {
            try {
                qb.addChild('user', [{}]);
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

        it('Should control missing field name 3', () => {
            try {
                qb.addChild({});
            } catch (err) {
                expect(err).equal('Not found name property');
            }
        });

    });


});
