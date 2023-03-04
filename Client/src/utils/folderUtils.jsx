import { graphQlRequest } from "./request";

export const folderLoader = async () => {
  const query = `query Folders {
        folders {
        id
        name
        createdAt
        }
    }`;

  const data = await graphQlRequest({ query });
  return data;
};

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;

  const data = await graphQlRequest({
    query,
    variables: { name: newFolder.name },
  });

  return data;
};
