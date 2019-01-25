export class QueryField {

    fields: any = {};
    filters: any = {};
    parent: any;
    depth = 0;
    name: string;

    constructor() {
        this.name = '';
    }

    addSibling(value: any, fields?: any, filters?: any): QueryField {

        if (typeof value === 'string' && (fields || filters)) {
            value = {
                name: value,
                fields: fields,
                filters: filters
            };
        }

        if (value.constructor === Array) {
            for (let i in value) {
                if (value.hasOwnProperty(i)) {
                    if (typeof value[i] === 'string') {
                        this.fields[value[i]] = new QueryField();
                        this.fields[value[i]].name = value[i];
                        this.fields[value[i]].parent = this;
                    } else if (value[i].constructor === Object) {
                        if (!value[i].name) {
                            throw "Not found name property";
                        }
                        this.addChild(value[i].name, value[i].fields, value[i].filters);
                    } else {
                        throw "Not supported field type";
                    }
                }
            }
        } else if (typeof value === 'string') {
            this.fields[value] = new QueryField();
            this.fields[value].name = value;
            this.fields[value].parent = this;
        } else if (value.constructor === Object) {
            if (!value.name) {
                throw "Not found name property";
            }
            this.addChild(value.name, value.fields, value.filters);

        }
        return this;
    }


    addParent(value: any, fields?: any, filters?: any): QueryField {

        if (arguments.length === 1 && value.constructor === Object) {
            const tmp = {...value};
            value = tmp['name'];
            fields = tmp['fields'];
            filters = tmp['filters'];
            if (!value || value === '') {
                throw "Not found name property";
            }
        }

        if (this.parent) {
            this.parent.fields[value] = new QueryField();
            if (fields) {
                if (fields.constructor === Array) {
                    for (let i = 0; i < fields.length; i++) {
                        if (typeof fields[i] === 'string')
                            this.parent.fields[value].addParent(fields[i]);
                        else if (fields[i].constructor === Object) {
                            if (!fields[i].name) {
                                throw "Not found name property";
                            }
                            this.parent.fields[value].addParent(fields[i].name, fields[i].fields, fields[i].filters);
                        }
                    }
                } else if (typeof fields === 'string') {
                    this.parent.fields[value].addParent(fields);
                } else if (fields.constructor === Object) {
                    if (!fields.name) {
                        throw "Not found name property";
                    }
                    this.parent.fields[value].addParent(fields.name, fields.fields, fields.filters);
                }
            }
            this.parent.fields[value].parent = this.parent;
            this.parent.fields[value].name = value;
            if (filters) {
                this.parent.fields[value].filters = filters;
            }
            return this.parent;
        } else {
            this.fields[value] = new QueryField();
            if (fields) {
                if (fields.constructor === Array) {
                    for (let i = 0; i < fields.length; i++) {
                        if (typeof fields[i] === 'string')
                            this.fields[value].addParent(fields[i]);
                        else if (fields[i].constructor === Object) {
                            if (!fields[i].name) {
                                throw "Not found name property";
                            }
                            this.fields[value].addParent(fields[i].name, fields[i].fields, fields[i].filters);
                        }
                    }
                } else if (typeof fields === 'string') {
                    this.fields[value].addParent(fields);
                } else if (fields.constructor === Object) {
                    if (!fields.name) {
                        throw "Not found name property";
                    }
                    this.fields[value].addParent(fields.name, fields.fields, fields.filters);
                }
            }
            this.fields[value].parent = this;
            this.fields[value].name = value;
            if (filters) {
                this.fields[value].filters = filters;
            }
            return this.fields[value];
        }
    }

    addChild(value: any, fields?: any, filters?: any): QueryField {

        if (arguments.length === 1 && value.constructor === Object) {
            const tmp = {...value};
            value = tmp['name'];
            fields = tmp['fields'];
            filters = tmp['filters'];
            if (!value || value === '') {
                throw "Not found name property";
            }
        }

        this.fields[value] = new QueryField();
        if (fields) {
            if (fields.constructor === Array) {
                for (let i = 0; i < fields.length; i++) {
                    if (typeof fields[i] === 'string') {
                        this.fields[value].addChild(fields[i]);
                    } else if (fields[i] instanceof Object) {
                        if (!fields[i].name) {
                            throw "Not found name property";
                        }
                        this.fields[value].addChild(fields[i].name, fields[i].fields, fields[i].filters);
                    }
                }
            } else if (typeof fields === 'string') {
                this.fields[value].addChild(fields);
            } else if (fields.constructor === Object) {
                if (!fields.name) {
                    throw "Not found name property";
                }
                this.fields[value].addChild(fields.name, fields.fields, fields.filters);
            }
        }
        this.fields[value].parent = this;
        this.fields[value].name = value;
        if (filters) {
            this.fields[value].filters = filters;
        }
        return this.fields[value];
    }

}
