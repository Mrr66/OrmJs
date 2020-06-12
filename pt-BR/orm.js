// JavaScript source code
// JavaScript source code
//Orm JS build 2020
//Por Marcos Rafael Rodrigues
//E-mail: marcos@sigvirtual.com
//Site: sigvirtual.com
//Idioma: pt-BR

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

    self.atualizar = function (objeto) {
        var nomeTabela = objeto.constructor.name;
        self.db.transaction(function (tx) {
            self.valueMarcacao = new Array();
            var query = `update ${nomeTabela} ${self.obterValoresSetUpdate(self.obterAtributo(Object.keys(objeto)), self.obterValoresAtributo(objeto))} where rowid=1`;
            tx.executeSql(query);
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
                tx.executeSql("DELETE FROM " + nomeTabela + " WHERE rowId = " + objeto.Id);
            else
                console.error("Id tabela " + nomeTabela + " não foi passado. Obs: todas entidades deve possuir atributo Id");
        });
    };

    self.DeletarPeloId = function (id, entity) {
        var nomeTabela = entity.constructor.name;
        self.db.transaction(function (tx) {
            console.log("Tabela " + nomeTabela + " atributos da tabela " + self.GetAttribute(Object.keys(entity)));
            if (id > 0)
                tx.executeSql("DELETE FROM " + nomeTabela + " WHERE rowId = " + id);
            else
                console.error("Id table " + nomeTabela + " it was not passed. Note: all entities must have Id attribute");
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

    self.obterValoresSetUpdate = function(atributo, valores){
        var resultSet ="";
        atributo.split(",").forEach((name, index) => {
            if(name != "Id"){
                if(index == 0){
                    if(typeof valores[index] == "string")
                        resultSet += `SET ${name}="${valores[index]}",`;
                    else
                        resultSet += `SET ${name}=${valores[index]},`;
                }
                else if((valores.length - 2) == index) //Menos o ID e a posição 0
                    if(typeof valores[index] == "string")
                        resultSet += ` ${name}="${valores[index]}"`;
                    else 
                        resultSet += ` ${name}=${valores[index]}`;
                else
                    if(typeof valores[index] == "string")
                        resultSet += ` ${name}="${valores[index]}",`;
                    else
                        resultSet += ` ${name}=${valores[index]},`;
            }
        });
        return resultSet;
    }

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