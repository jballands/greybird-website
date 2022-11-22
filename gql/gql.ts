/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n\tquery FetchInitialRoutes {\n\t\troutes(depart: \"aus\") {\n\t\t\tdepart {\n\t\t\t\tcoordinate {\n\t\t\t\t\tlat\n\t\t\t\t\tlng\n\t\t\t\t}\n\t\t\t}\n\t\t\tarrive {\n\t\t\t\tcoordinate {\n\t\t\t\t\tlat\n\t\t\t\t\tlng\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.FetchInitialRoutesDocument,
};

export function graphql(source: "\n\tquery FetchInitialRoutes {\n\t\troutes(depart: \"aus\") {\n\t\t\tdepart {\n\t\t\t\tcoordinate {\n\t\t\t\t\tlat\n\t\t\t\t\tlng\n\t\t\t\t}\n\t\t\t}\n\t\t\tarrive {\n\t\t\t\tcoordinate {\n\t\t\t\t\tlat\n\t\t\t\t\tlng\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery FetchInitialRoutes {\n\t\troutes(depart: \"aus\") {\n\t\t\tdepart {\n\t\t\t\tcoordinate {\n\t\t\t\t\tlat\n\t\t\t\t\tlng\n\t\t\t\t}\n\t\t\t}\n\t\t\tarrive {\n\t\t\t\tcoordinate {\n\t\t\t\t\tlat\n\t\t\t\t\tlng\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;