const graphql = require('graphql');
const productService = require('../../service/productService');
const shoppingCarService = require('../../service/shoppingCarService');

const RGBType = new graphql.GraphQLEnumType({
  name: 'category',
  values: {
    FOOD: { value: 'FOOD' },
    TECH: { value: 'TECH' },
    TOYS: { value: 'TOYS' }
  }
});

const Product = new graphql.GraphQLObjectType({
  name: 'product',
  fields: () => ({
    code: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    price: { type: graphql.GraphQLInt },
    category: { type: RGBType }
  })
});

const Product_shopping_car = new graphql.GraphQLObjectType({
  name: 'product_shopping_car',
  fields: () => ({
    code: { type: graphql.GraphQLInt },
    quantity: { type: graphql.GraphQLInt }
  })
});

Product._typeConfig = {
  sqlTable: 'product',
  uniqueKey: 'code',
}

const ShoppingCar = new graphql.GraphQLObjectType({
  name: 'shopping_car',
  fields: () => ({
    _id: { type: graphql.GraphQLString },
    code: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    totalPrice: { type: graphql.GraphQLInt },
    products: { type: new graphql.GraphQLList(Product_shopping_car) }
  })
});

ShoppingCar._typeConfig = {
  sqlTable: 'shopping_car',
  uniqueKey: '_id:'
}

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'shopping_car_query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    },

    products: {
      type: new graphql.GraphQLList(Product),
      resolve: productService.gellAllProduct
    },

    product: {
      type: Product,
      args: { code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) } },
      resolve: (parent, args, context, resolveInfo) => productService.getProductByCode(args.code)
    },
  })
});

const MutationRootProduct = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () =>
  ({
    productSave: {
      type: Product,
      args: {
        code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        price: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        category: { type: graphql.GraphQLNonNull(RGBType) }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        var product =
        {
          "code": args.code,
          "name": args.name,
          "price": args.price,
          "category": args.category
        };
        return await productService.saveProduct(product);
      }
    },
    productUpdate: {
      type: Product,
      args: {
        code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        price: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
        category: { type: graphql.GraphQLNonNull(RGBType) }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        var product =
        {
          "code": args.code,
          "name": args.name,
          "price": args.price,
          "category": args.category
        };
        return await productService.updateProduct(args.code, product);
      }
    },

    shoppingCarSave: {
      type: ShoppingCar,
      args: {
        code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        totalPrice: { type: graphql.GraphQLNonNull(graphql.GraphQLInt)},
       /// products: { type: graphql.GraphQLList(Product_shopping_car)}
       products: {type: graphql.GraphQLNonNull(graphql.GraphQLString)}
      },
      resolve: async (parent, args, context, resolveInfo) => {
        var shoppingCar =
        {
          "code": args.code,
          "totalPrice": args.totalPrice,
          "products": args.products
        };
        return await shoppingCarService.saveShoppingCar(shoppingCar);
      }
    }
  })
});

const schemaProduct = new graphql.GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRootProduct
});

module.exports = schemaProduct
