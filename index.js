const {gql, ApolloServer} = require("apollo-server")

const produtos = [
    {
        id: 1,
        nome: 'tv',
        valor: 2500.00
    },
    {
        id: 2,
        nome: 'pc',
        valor: 4000.00
    }
]

const usuarios = [
    {
        id: 1,
        nome: 'erick',
        idade: 19,
        salario: 1234.34,
        ativo: true 
    },
    {
        id: 2,
        nome: 'naju',
        idade: 19,
        salario: 3500.00,
        ativo: true
    }
]

const typeDefs = gql`
    type Usuario{
    idade: Int
    salario: Float
    nome: String
    ativo: Boolean
    id: ID
    }

    type Produto{
        id: ID
        nome: String
        valor: Float
    }

    type Query{
        usuarios: [Usuario]
        produtos: [Produto]
        usuario(id: Int, nome: String): Usuario
        produto(id: Int, nome: String): Produto
    }
`;
const resolvers = {
    Query: {
        usuarios(){
            return usuarios;
        },        
        usuario(_, args){
            const {id, nome} = args
            if(id) return usuarios.find((usuario) => usuario.id == args.id);
            return usuarios.find((usuario) => usuario.nome == args.nome);
        },
        produtos(){
            return produtos;
        },
        produto(_, args){
            const{id, nome} = args;
            if(id) return produtos.find((produto) => produto.id == args.id);
            return produtos.find((produto) => produto.nome == args.nome);
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen();