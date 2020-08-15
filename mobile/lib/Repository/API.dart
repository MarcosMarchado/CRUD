import 'dart:convert';

import 'package:crud/models/produto.dart';
import 'package:http/http.dart' as http;

class CRUD {
  Future<List<ProdutoModel>> getProduto() async {
    List<ProdutoModel> produtos;

    var response = await http.get("https://cryptic-ridge-02256.herokuapp.com/");

    if (response.statusCode == 200 || response.statusCode == 201) {
      // produtos = (response.data as List)
      //     .map((item) => ProdutoModel.fromJson(item))
      //     .toList();
      produtos = (json.decode(response.body) as List)
          .map((item) => ProdutoModel.fromJson(item))
          .toList();
    } else {
      produtos = null;
    }
    return produtos;
  }

  Future post({String nome, int preco}) async {
    Map bodyMap = {"nome": nome, "preco": preco};
    var produto;
    var response = await http.post(
      "https://cryptic-ridge-02256.herokuapp.com/",
      headers: {"Content-Type": "application/json"},
      body: json.encode(bodyMap),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      produto = response.body;
    } else {
      produto = null;
    }
    return produto;
  }

  Future delete({String id}) async {
    Map bodyMap = {"id": id};
    final client = http.Client();
    var response;
    try {
      response = await client.send(http.Request(
          "DELETE", Uri.parse("https://cryptic-ridge-02256.herokuapp.com/"))
        ..body = json.encode(bodyMap)
        ..headers["Content-Type"] = "application/json");
    } finally {
      client.close();
    }
    return response;
  }

  void put({String id, String nome, int preco}) async {
    Map bodyMap = {"id": id, "nome": nome, "preco": preco};
    await http.put(
      "https://cryptic-ridge-02256.herokuapp.com/",
      headers: {"Content-Type": "application/json"},
      body: json.encode(bodyMap),
    );
  }
}

// void delete({String id}) async {
//   Map bodyMap = {"id": id};
//   final client = http.Client();
//   try {
//     await client.send(http.Request(
//         "DELETE", Uri.parse("https://cryptic-ridge-02256.herokuapp.com/"))
//       ..body = json.encode(bodyMap));
//   } finally {
//     client.close();
//   }
// }
