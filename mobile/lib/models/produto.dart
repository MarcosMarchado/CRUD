class ProdutoModel {
  String sId;
  String nome;
  int preco;
  int iV;

  ProdutoModel({this.sId, this.nome, this.preco, this.iV});

  ProdutoModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    nome = json['nome'];
    preco = json['preco'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['nome'] = this.nome;
    data['preco'] = this.preco;
    data['__v'] = this.iV;
    return data;
  }
}
