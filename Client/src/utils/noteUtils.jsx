import { graphQlRequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  //   console.log("Loader", { params });
  const query = `query Folder($folderId: String!) {
          folder(folderId: $folderId) {
            id
            name
            notes {
              id
              content
            }
          }
        }`;

  const data = await graphQlRequest({
    query,
    variables: {
      folderId,
    },
  });
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      content
      id
      updatedAt
    }
  }`;

  const data = await graphQlRequest({
    query,
    variables: {
      noteId,
    },
  });
  return data;
};

export const addNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  console.log({ newNote });
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));

  console.log({ newNote, formDataObj });

  const query = `mutation Mutation($content: String!, $folderId: ID!) {
      addNote(content: $content, folderId: $folderId) {
        id
        content
      }
    }`;

  const { addNote } = await graphQlRequest({
    query,
    variables: formDataObj,
  });

  console.log({ addNote });

  return addNote;
};

export const updateNote = async ({ params, request }) => {
  const updatedNote = await request.formData();
  console.log({ updatedNote });
  const formDataObj = {};
  updatedNote.forEach((value, key) => (formDataObj[key] = value));

  console.log({ updatedNote, formDataObj });

  const query = `mutation Mutation($id: String!, $content: String!) {
      updateNote(id: $id, content: $content) {
        id
        content
      }
    }`;

  const { updateNote } = await graphQlRequest({
    query,
    variables: formDataObj,
  });

  console.log({ updateNote });

  return updateNote;
};
