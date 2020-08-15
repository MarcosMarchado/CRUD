import 'package:crud/Repository/API.dart';
import 'package:crud/models/produto.dart';
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MyApp(),
    ));

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  CRUD _repository;
  final _nome = TextEditingController();
  final _preco = TextEditingController();

  @override
  void initState() {
    super.initState();
    _repository = CRUD();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("CRUD with NodeJS"),
        centerTitle: true,
      ),
      body: Column(
        children: <Widget>[
          _textField(controller: _nome),
          _textField(controller: _preco),
          SizedBox(
            height: 10,
          ),
          RaisedButton(
            onPressed: () {
              setState(() {
                _repository.post(
                  nome: _nome.text,
                  preco: int.parse(_preco.text),
                );
                _nome.clear();
                _preco.clear();
              });
            },
            child: Text("Salvar Produto"),
          ),
          SizedBox(
            height: 10,
          ),
          Expanded(
            child: FutureBuilder(
              future: _repository.getProduto(),
              builder: (BuildContext context, AsyncSnapshot snapshot) {
                List<ProdutoModel> produtos = snapshot.data;
                return ListView.builder(
                  itemCount: produtos.length,
                  itemBuilder: (BuildContext context, int index) {
                    ProdutoModel produto = produtos[index];
                    return Dismissible(
                      key: Key(produto.sId),
                      onDismissed: (direction) {
                        _repository.delete(id: produto.sId);
                        setState(() {
                          produtos.removeAt(index);
                        });
                      },
                      background: Container(
                        color: Colors.grey,
                      ),
                      child: ListTile(
                        onTap: () {
                          _showDialog(produto.sId);
                        },
                        title: Text("${produto.nome}"),
                        subtitle: Text(produto.preco.toString()),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  void _showDialog(id) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text("Editar"),
            content: Column(
              children: <Widget>[
                _textField(controller: _nome),
                _textField(controller: _preco),
              ],
            ),
            actions: <Widget>[
              FlatButton(
                onPressed: () {
                  setState(() {
                    _repository.put(
                      id: id,
                      nome: _nome.text,
                      preco: int.parse(_preco.text),
                    );
                    _preco.clear();
                    _nome.clear();
                  });
                },
                child: Text("OK"),
              )
            ],
          );
        });
  }

  Widget _textField({TextEditingController controller}) {
    return Container(
      margin: EdgeInsets.only(left: 20, right: 20, top: 10),
      child: TextField(
        controller: controller,
        onChanged: (v) {},
        textAlign: TextAlign.center,
        style: TextStyle(fontSize: 15),
        decoration: InputDecoration(border: OutlineInputBorder()),
      ),
    );
  }
}
