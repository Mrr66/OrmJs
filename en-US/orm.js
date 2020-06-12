// JavaScript source code
//Orm JS build 2020
//By Marcos Rafael Rodrigues
//E-mail: marcos@sigvirtual.com
//Site: sigvirtual.com
//Language: US

function dataBaseLocation(name, version, description = "DB SQL location", lengthDB = 2097152) {
    var self = this;
    self.db = null;
    self.valueMarcacao = null; // faz isso de acordo com os atributos da tabela: ?, ?, ? ...

    self.connect = function () {
        self.db = openDatabase(name, version, description, lengthDB);
    };

    self.Save = function (object) {
        var nomeTabela = object.constructor.name;
        self.db.transaction(function (tx) {
            self.valueMarcacao = new Array();
            self.GetValueAttribute(object);
            tx.executeSql("INSERT INTO " + object.constructor.name + "(" + self.GetAttribute(Object.keys(object)) + ") VALUES (" + self.valueMarcacao.toString() + ")", self.GetValueAttribute(object), console.log("OK"), console.log
                ("Erro"));
        });
    };

    self.Update = function (object) {
        var nomeTabela = objeto.constructor.name;
        self.db.transaction(function (tx) {
            self.valueMarcacao = new Array();
            var query = `update ${nomeTabela} ${self.obterValoresSetUpdate(self.GetAttribute(Object.keys(objeto)), self.GetValueAttribute(objeto))} where rowid=1`;
            tx.executeSql(query);
        });
    };

    self.CreateTable = function (object) {
        var nomeTabela = object.constructor.name;
        self.db.transaction(function (tx) {
            console.log("Tabela " + nomeTabela + " table attributes " + self.GetAttribute(Object.keys(object)));
            tx.executeSql('CREATE TABLE ' + nomeTabela + ' (' + self.GetAttribute(Object.keys(object)) + ')');
        });
    };

    self.DeleteRow = function (object) {
        var nomeTabela = object.constructor.name;
        self.db.transaction(function (tx) {
            console.log("Tabela " + nomeTabela + " atributos da tabela " + self.GetAttribute(Object.keys(object)));
            if (object.Id > 0)
                tx.executeSql("DELETE FROM " + nomeTabela + " WHERE rowId = " + object.Id);
            else
                console.error("Id table " + nomeTabela + " it was not passed. Note: all entities must have Id attribute");
        });
    };

    self.DeleteById = function (id, entity) {
        var nomeTabela = entity.constructor.name;
        self.db.transaction(function (tx) {
            console.log("Tabela " + nomeTabela + " atributos da tabela " + self.GetAttribute(Object.keys(entity)));
            if (id > 0)
                tx.executeSql("DELETE FROM " + nomeTabela + " WHERE rowId = " + id);
            else
                console.error("Id table " + nomeTabela + " it was not passed. Note: all entities must have Id attribute");
        });
    };

    self.GetAll = function (object, callBack) {
        var result = new Array();
        var nomeTabela = object.constructor.name;
        self.db.transaction(function (tx) {
                tx.executeSql('SELECT  rowId, * FROM ' + nomeTabela + '', [], result = callBack, self.errorCB);
        });
    };

    //Consulta sql nativa
    self.QuerySql = function (sql, callBack) {
        var result = new Array();
        self.db.transaction(function (tx) {
            tx.executeSql(sql, [], callBack, self.errorCB);
        });
        return result;
    };


    self.GetByObject = function (object, callBack) {
        var nomeTabela = object.constructor.name;
        self.db.transaction(function (tx) {
            if (object.Id > 0)
                tx.executeSql('SELECT  rowId, * FROM ' + nomeTabela + ' where rowId = ' + object.Id + '', [], result = callBack, self.errorCB);
            else
                console.error("Id da tabela " + nomeTabela + " it was not passed.Note: all entities must have Id attribute");
        });
    };

    self.GetById = function (id, entity, callBack) {
        var nomeTabela = entity.constructor.name;
        if (nomeTabela === undefined)
            console.error("It is necessary to pass the end by parameter.");
        self.db.transaction(function (tx) {
            if (id > 0)
                tx.executeSql('SELECT  rowId, * FROM ' + nomeTabela + ' where rowId = ' + id + '', [], result = callBack, self.errorCB);
            else
                console.error("Id da table " + nomeTabela + " it was not passed.Note: all entities must have Id attribute");
        });
    };

    self.GetAttribute = function (propertyList) {
        var nomeAtr = "";
        propertyList.forEach((value, index) => {
            nomeAtr += value;
            if (index + 1 < propertyList.length)
                nomeAtr += ",";
        });
        return nomeAtr;
    };

    self.GetValueAttribute = function (object) {
        var arrayList = new Array();
        Object.getOwnPropertyNames(object).forEach(value => { 
            arrayList.push(object[value]);
            self.valueMarcacao.push("?");
        });
        return arrayList;
    };

    self.DeleteTable = function (object) {
        var nomeTabela = object.constructor.name;
        self.db.transaction(function (tx) {
            console.log("Table " + nomeTabela + " deleted ");
            tx.executeSql('DROP TABLE ' + nomeTabela);
        });
    };

    self.errorCB = function (e) {
        console.log("Erro interno do app: " + e, "Erro");
    };

    self.toList = function (type, object) {
        var list = new Array();
        for (var i = 0; i < object.length; i++) {
            list.push(object[i]);
        }
        return list;
    };

}