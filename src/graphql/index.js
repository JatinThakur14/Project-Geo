import gql from "graphql-tag";
export const SIGN_UP = gql`
  mutation insertUsers($username: String!, $password: String!) {
    insert_users(objects: { username: $username, password: $password }) {
      affected_rows
      returning {
        username
      }
    }
  }
`;
export const LOGIN_USER = gql`
  query checkUsers {
    users {
      username
      password
    }
  }
`;
export const INSERT_PATH = gql`
  mutation setPath($name: String!, $path: jsonb!) {
    insert_paths(objects: { path_name: $name, path: $path }) {
      affected_rows
      returning {
        path_name
        path
      }
    }
  }
`;
export const GET_PATH = gql`
  query myQuery {
    paths {
      path_name
      path
    }
  }
`;
