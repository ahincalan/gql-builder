import {GqlBuilder} from "..";
import {expect, should} from "chai";


describe('GqlBuilder builder Property Test Suits', function () {

    let qb: GqlBuilder;
    beforeEach(() => {
        qb = new GqlBuilder();
    });

    it('Should be created GqlBuilder', () => {
        should().exist(qb);
    });

    it('Should be created query 1', () => {
        qb.addChild('user').addChild('address');
        expect(qb.fields['user'].fields['address'].name).equal('address');
    });

    it('Should be created query 2', () => {
        qb.addChild('user').addParent('person');
        expect(qb.fields['person'].name).equal('person');
    });

    it('Should be created query 3', () => {
        qb.addChild('user', ['id', 'name']).addParent('person', {name: 'id'});
        expect(qb.fields['person'].fields['id'].name).equal('id');
    });

    it('Should be created query 4', () => {
        qb.addSibling('user').addParent('person', {name: 'id'});
        expect(qb.fields['person'].fields['id'].name).equal('id');
    });

    it('Should be created query 5', () => {
        qb.addSibling('user').addParent('person', {name: 'id'}, {id: 'Int'});
        expect(qb.fields['person'].fields['id'].name).equal('id');
        expect(qb.toQueryString().indexOf('$id : Int') > 0).equal(true);
    });

    it('Should be created query 6', () => {
        qb.addSibling('person', ['id', 'name', 'desc'], {
            values: {
                name: 'String',
                desc: 'Int'
            }
        });
        expect(qb.fields['person'].fields['id'].name).equal('id');
        expect(qb.toMutationString().indexOf('name: $name') > 0).equal(true);
    });

});
