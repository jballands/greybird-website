/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type City = {
  __typename?: 'City';
  coordinate: Coordinate;
  id: Scalars['ID'];
  name: Scalars['String'];
  routes: Array<Route>;
};

export type Coordinate = {
  __typename?: 'Coordinate';
  id: Scalars['ID'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  coordinates: Array<Coordinate>;
  destinations: Array<City>;
  routes: Array<Route>;
};


export type QueryCoordinatesArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryDestinationsArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryRoutesArgs = {
  arrive?: InputMaybe<Scalars['ID']>;
  depart?: InputMaybe<Scalars['ID']>;
  elevated?: InputMaybe<Scalars['Boolean']>;
  flightNumber?: InputMaybe<Scalars['Int']>;
};

export type Route = {
  __typename?: 'Route';
  arrive: City;
  depart: City;
  elevated: Scalars['Boolean'];
  flightNumber: Scalars['Int'];
  id: Scalars['ID'];
};

export type FetchInitialRoutesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchInitialRoutesQuery = { __typename?: 'Query', routes: Array<{ __typename?: 'Route', depart: { __typename?: 'City', coordinate: { __typename?: 'Coordinate', lat: number, lng: number } }, arrive: { __typename?: 'City', coordinate: { __typename?: 'Coordinate', lat: number, lng: number } } }> };


export const FetchInitialRoutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchInitialRoutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"routes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"depart"},"value":{"kind":"StringValue","value":"aus","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrive"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchInitialRoutesQuery, FetchInitialRoutesQueryVariables>;