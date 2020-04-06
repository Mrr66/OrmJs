#  OrmJs 1.0.1

Mapeamento objeto-relacional com javascript 
>Object Relational Mapping with javascript

# # Primeiro ORM feito em javascript para persistência de dados local com Web SQL.

O ***OrmJs*** é uma biblioteca leve que permite armazenar dados localmente pelo navegador com  [Web SQL]([https://developers.google.com/web/tools/chrome-devtools/storage/websql](https://developers.google.com/web/tools/chrome-devtools/storage/websql)), sem precisar usar instruções SQL, todas as consultas e inserções são feita de forma simples e elegante usando apenas orientação a objeto e conceitos de entidade representativas com **javascript**.

**CRUD COMPLETO**

 - Select
 - Insert
 - Update
 - Delete
 >Sem usar instruções SQL

## Conectando em um banco de dados

Para conectar em banco de dados basta informa seu nome com sua versão, você poderá passar também uma descrição para seu banco e o tamanho dele.

No código abaixo conecta cria ou acessa um banco de dados com nome "dbTeste".
```js
var ormJs = new dataBaseLocation("dbTeste","1.0.1");
ormJs.conectar();
```
Passando uma descrição e um tamanho fixo no banco de dados o padrão é **2 MB**.
```js
var ormJs = new dataBaseLocation("dbTeste","1.0.1","DB Local com web SQL", (10*1024*2024)); //10 MB
ormJs.conectar();
```

## Criando uma entidade e salvando dados
Para criar um representação de sua tabela basta criar uma class com os atributos que será usado.
```js
class Usuario {
     Nome;
     Idade;
     Sexo;
}
```
Agora vamos para parte mágica no **ORMJS** primeiro vamos criar uma tabela e salvar dados na mesma.
```js
var usuario = new Usuario();
    ormJs.criarTabela(usuario);
    usuario.Nome = "Marcos Rafael";
    usuario.Idade = 25;
    usuario.Sexo = "Masculino";
    ormJs.salvar(usuario);
```


> **Result:** 

|  rowId |Nome            |Idade  | Sexo         
|--------|----------------|-------|---------|
|1|Marcos Rafael |25 | Masculino|

>`Note que rowId foi adicionando automaticamente ela será sua primary Key`

Para ver o resultado no Chrome basta aperta F12 e navegar em application em storage selecione Web SQL.

## Selecionando dados da tabela  
Obtendo uma lista de todos os registro da tabela Usuario
```js
var usuario = new Usuario();
orm.obterLista(usuario, (tx, result) => {
	var list = orm.toList(Usuario, result.rows);//Convertendo SQLResultSetRowList para List<Usuario>
	console.log(list);
});
```
> **Result console:** 
> 
!["OK"](https://raw.githubusercontent.com/Mrr66/OrmJs/master/img/list%20user.PNG)
