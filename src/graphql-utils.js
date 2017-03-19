'use strict';

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

export const getFields = attributes => {
  Object.keys(attributes)
    .forEach(key => {
      let value = {
        description: attributes[key],
        type: GraphQLString,
        resolve: parent => parent[key] || ''
      };

      if(attributes[key] instanceof Array)
        value = {
          description: attributes[key][0].description,
          type: new GraphQLList(
            new GraphQLObjectType(attributes[key][0])
          ),
          resolve: parent => parent[key] || [{}]
        };
      else if(attributes[key] instanceof Object)
        value = {
          description: attributes[key].description,
          type: new GraphQLList(
            new GraphQLObjectType(attributes[key])
          ),
          resolve: parent => parent[key] || {}
        };

      attributes[key] = value;
    });

  return attributes;
};
