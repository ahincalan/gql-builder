import {QueryField} from "./QueryField";

export class GqlBuilder extends QueryField {

    constructor() {
        super();
    }

    toMutationString(): string {
        this._setFilters(this.fields);
        this._setDepth(this.fields);
        return 'mutation ' + this._filterToString() + ' {\n' + this._queryPrepare() + '\n}';
    }

    toQueryString(): string {
        this._setFilters(this.fields);
        this._setDepth(this.fields);
        return 'query ' + this._filterToString() + ' {\n' + this._queryPrepare() + '\n}';
    }

    private _filterToString(): string {
        let str = '';
        for (const filter in this.filters) {
            if (this.filters.hasOwnProperty(filter)) {
                if (typeof this.filters[filter] === 'string') {
                    if (str !== '') str += ',\n';
                    str += '$' + filter + ' : ' + this.filters[filter];
                } else if (this.filters[filter] instanceof Object) {
                    const obj = this.filters[filter];
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (str !== '') str += ',\n';
                            str += '$' + key + ' : ' + obj[key];
                        }
                    }
                }
            }
        }
        return (str ? '(' + str + ')' : '');
    }

    private _setFilters(fields?: any): void {
        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                if (fields[key].filters)
                    this.filters = {...this.filters, ...fields[key].filters};
                if (fields[key].fields && Object.keys(fields[key].fields).length > 0) {
                    this._setFilters(fields[key].fields);
                }
            }
        }
    }

    private _setDepth(fields?: any): void {
        for (const key in fields) {
            if (fields.hasOwnProperty(key)) {
                if (fields[key].parent)
                    fields[key].depth = fields[key].parent.depth + 1;
                if (fields[key].fields && Object.keys(fields[key].fields).length > 0) {
                    this._setDepth(fields[key].fields);
                }
            }
        }
    }


    private _addFilterString(filters: any): string {
        let ret = '';
        for (const filter in filters) {
            if (filters.hasOwnProperty(filter)) {
                if (typeof filters[filter] === 'string') {
                    if (ret !== '') ret += ',';
                    ret += filter + ': $' + filter;
                } else if (filters[filter] instanceof Object) {
                    if (ret !== '') ret += ',';
                    ret += filter + ': { ';
                    let sf = '';
                    for (const _key in filters[filter]) {
                        if (filters[filter].hasOwnProperty(_key)) {
                            if (sf !== '') sf += ',';
                            sf += _key + ': $' + _key;
                        }
                    }
                    ret += sf;
                    ret += '}';
                }
            }
        }
        if (Object.keys(filters).length > 0)
            ret = '( ' + ret + ' ) ';

        return ret;
    }

    private _queryPrepare(fields?: any, ret?: string) {
        const _fields = fields || this.fields;
        let _ret = ret || '';
        for (const key in _fields) {
            if (_fields.hasOwnProperty(key)) {
                if (_fields[key].fields && Object.keys(_fields[key].fields).length > 0) {
                    let tt2 = '';
                    for (let j = 0; j <= _fields[key].depth; j++) tt2 += '\t';
                    _ret += tt2 + key + ' ';
                    if (_fields[key].filters) {
                        _ret += this._addFilterString(_fields[key].filters);
                    }
                    _ret += '{\n';
                    _ret = this._queryPrepare(_fields[key].fields, _ret);
                    _ret += '\n' + tt2 + '}\n';
                } else {
                    let tt = '';
                    for (let j = 0; j <= _fields[key].depth; j++) tt += '\t';
                    _ret += tt + key + '\n';
                    if (_fields[key].filters)
                        _ret += this._addFilterString(_fields[key].filters);
                }
            }
        }
        return _ret;
    }

}
