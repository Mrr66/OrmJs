// JavaScript source code

function dataBaseLocation(name, version, description = "DB local", lengthDB = 2097152) {
    var self = this;
    self.db = null;
    self.valueMarcacao = null; // faz isso de acordo com os atributos da tabela: ?, ?, ? ...

    self.conectar = function () {
        self.db = openDatabase(name, version, description, lengthDB);
    };

    self.salvar = function (objeto) {
        var nomeTabela = objeto.constructor.name;
        self.db.transaction(function (tx) {
            self.valueMarcacao = new Array();
            self.obterValoresAtributo(objeto);
            tx.executeSql("INSERT INTO " + objeto.constructor.name + "(" + self.obterAtributo(Object.keys(objeto)) + ") VALUES (" + self.valueMarcacao.toString() + ")", self.obterValoresAtributo(objeto), console.log("OK"), console.log
                ("Erro"));
        });
    };

    self.criarTabela = function (objeto) {
        var nomeTabela = objeto.constructor.name;
        self.db.transaction(function (tx) {
            console.log("Tabela " + nomeTabela + " atributos da tabela " + self.obterAtributo(Object.keys(objeto)));
            tx.executeSql('CREATE TABLE ' + nomeTabela + ' (' + self.obterAtributo(Object.keys(objeto)) + ')');
        });
    };

    self.DeletarLinha = function (objeto) {
        var nomeTabela = objeto.constructor.name;
        self.db.transaction(function (tx) {
            console.log("Tabela " + nomeTabela + " atributos da tabela " + self.obterAtributo(Object.keys(objeto)));
            if (objeto.Id > 0)
                tx.executeSql('DELETE FROM SET IdRow = ' + objeto.Id + ' (id unique, ' + self.obterAtributo(Object.keys(objeto)) + ')');
            else
                console.error("Id do tabela " + nomeTabela + " não foi passado. Obs: todas entidades deve possuir atributo Id");
        });
    };

    self.obterLista = function (objeto, callBack) {
        var result = new Array();
        var nomeTabela = objeto.constructor.name;
        self.db.transaction(function (tx) {
                tx.executeSql('SELECT  rowId, * FROM ' + nomeTabela + '', [], result = callBack, self.errorCB);
        });
    };

    //Consulta sql nativa
    self.querySql = function (sql, callBack) {
        var result = new Array();
        self.db.transaction(function (tx) {
            tx.executeSql(sql, [], callBack, self.errorCB);
        });
        return result;
    };


    self.obterPorObject = function (objeto, callBack) {
        var nomeTabela = objeto.constructor.name;
        self.db.transaction(function (tx) {
            if (objeto.Id > 0)
                tx.executeSql('SELECT  rowId, * FROM ' + nomeTabela + ' where rowId = ' + objeto.Id + '', [], result = callBack, self.errorCB);
            else
                console.error("Id da tabela " + nomeTabela + " não foi passado. Obs: todas entidades deve possuir atributo Id");
        });
    };

    self.obterPorId = function (id, entidade, callBack) {
        var nomeTabela = entidade.name;
        if (nomeTabela === undefined)
            console.error("É nescessario passar a endidade por paramentro.");
        self.db.transaction(function (tx) {
            if (id > 0)
                tx.executeSql('SELECT  rowId, * FROM ' + nomeTabela + ' where rowId = ' + id + '', [], result = callBack, self.errorCB);
            else
                console.error("Id da tabela " + nomeTabela + " não foi passado. Obs: todas entidades deve possuir atributo Id");
        });
    };

    self.obterAtributo = function (listaPropiedade) {
        var nomeAtr = "";
        listaPropiedade.forEach((value, index) => {
            nomeAtr += value;
            if (index + 1 < listaPropiedade.length)
                nomeAtr += ",";
        });
        return nomeAtr;
    };

    self.obterValoresAtributo = function (objeto) {
        var arrayList = new Array();
        Object.getOwnPropertyNames(objeto).forEach(value => { 
            arrayList.push(objeto[value]);
            self.valueMarcacao.push("?");
        });
        return arrayList;
    };

    self.excluirTabela = function (objeto) {
        var nomeTabela = objeto.constructor.name;
        self.db.transaction(function (tx) {
            console.log("Tabela " + nomeTabela + " foi excluida ");
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