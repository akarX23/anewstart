import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { firebaseTeams, firebaseArticles, firebase } from "../../firebase";

import styles from "./dashboard.css";
import FormFields from "../widgets/FormFields/formfields";
import Uploader from "../widgets/FileUploader/fileuploader";

export default class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: "",
    loading: false,
    formdata: {
      author: {
        element: "input",
        value: "",
        config: {
          name: "author_input",
          type: "text",
          placeholder: "Enter your Name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      title: {
        element: "input",
        value: "",
        config: {
          name: "title_input",
          type: "text",
          placeholder: "Enter title",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      body: {
        element: "texteditor",
        value: "",
        valid: true,
      },
      image: {
        element: "image",
        value: "",
        valid: true,
      },
      team: {
        element: "select",
        value: "",
        config: {
          name: "teams_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      tags: {
        element: "input",
        value: "",
        config: {
          name: "tags_input",
          type: "text",
          placeholder: "Enter tags (separaed by space)",
        },
        validation: {
          required: false,
        },
        valid: true,
        touched: true,
        validationMessage: "",
      },
    },
  };

  componentDidMount() {
    this.loadTeams();
  }

  loadTeams = () => {
    firebaseTeams.once("value").then((snapshot) => {
      let teams = [];

      snapshot.forEach((child) => {
        teams.push({
          id: child.val().teamId,
          name: child.val().city,
        });
      });
      const newElement = { ...this.state.formdata.team };
      newElement.config.options = teams;
      const newFormdata = { ...this.state.formdata };
      newFormdata["team"] = newElement;

      this.setState({ formdata: newFormdata });
    });
  };

  getTags = (tagString) => {
    return tagString.trim().split(" ");
  };

  updateForm = (element, content = "") => {
    const newFormdata = {
      ...this.state.formdata,
    };

    const newElement = { ...newFormdata[element.id] };

    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;
    this.setState({ formdata: newFormdata });
  };

  validate = (element) => {
    let error = ["true", ""];

    if (element.validation.required) {
      const valid = element.value.trim() !== "";
      const errorMessage = "This field is required";
      error = valid ? error : [valid, errorMessage];
    }
    return error;
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = formIsValid ? this.state.formdata[key].valid : false;
    }
    dataToSubmit["tags"] = this.getTags(dataToSubmit["tags"]);

    if (formIsValid) {
      this.setState({ loading: true, postError: "" });

      firebaseArticles
        .orderByChild("id")
        .limitToLast(1)
        .once("value")
        .then((snapshot) => {
          let articleId = null;
          snapshot.forEach((child) => {
            articleId = child.val().id;
          });

          dataToSubmit["date"] = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit["id"] = articleId + 1;
          dataToSubmit["team"] = parseInt(dataToSubmit["team"], 10);

          firebaseArticles
            .push(dataToSubmit)
            .then((article) => {
              this.props.history.push(`/articles/${article.key}`);
            })
            .catch((e) => {
              this.setState({ postError: e.message });
            });
        });
    } else {
      this.setState({ postError: "Something went wrong" });
    }
  };

  submitButton = () =>
    this.state.loading ? (
      "loading..."
    ) : (
      <div>
        <button type="submit">Add Post</button>
      </div>
    );

  showError = () =>
    this.state.postError !== "" ? (
      <div className={styles.error}>{this.state.registerError}</div>
    ) : (
      ""
    );

  onEditorStateChange = (editorState) => {
    let contentState = editorState.getCurrentContent();
    let rawState = convertToRaw(contentState);
    let html = stateToHTML(contentState);

    this.updateForm({ id: "body" }, html);
    this.setState({ editorState });
  };

  storeFilename = (filename) => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    return (
      <div className={styles.postContainer}>
        <form onSubmit={this.submitForm}>
          <h2>Add Post</h2>

          <Uploader filename={(filename) => this.storeFilename(filename)} />

          <FormFields
            id={"author"}
            formdata={this.state.formdata.author}
            change={(element) => this.updateForm(element)}
          />
          <FormFields
            id={"title"}
            formdata={this.state.formdata.title}
            change={(element) => this.updateForm(element)}
          />
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          <FormFields
            id={"team"}
            formdata={this.state.formdata.team}
            change={(element) => this.updateForm(element)}
          />
          <FormFields
            id={"tags"}
            formdata={this.state.formdata.tags}
            change={(element) => this.updateForm(element)}
          />
          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}
