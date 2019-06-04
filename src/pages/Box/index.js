import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from 'react-dropzone';

import { Logo } from "../../components";
import api from "../../services/api";

import "./style.css";

export default class Box extends Component {
  state = {
    box: {}
  };

  async componentDidMount() {
    const {
      props: {
        match: {
          params: { id: box }
        }
      }
    } = this;

    try {
      const response = await api.get(`boxes/${box}`);

      this.setState({ box: response.data });
    } catch (err) {
      console.error(err);
    }
  }

   handleUpload = files => {
    files.forEach(async file => {
      const { box } = this.state;

      const formData = new FormData();

      formData.append('file', file);

      try {
        const response = await api.post(`/boxes/${box._id}/files`, formData);

        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    });
  }

  render() {
    const { box } = this.state;

    return (
      <div id="box-container">
        <header>
          <Logo />
          <h1>{box.title}</h1>
        </header>

        <Dropzone onDrop={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arraste e solte seu arquivo aqui ou clique para selecionar...</p>
            </div>
          )}
        </Dropzone>

        <ul>
          {box.files &&
            box.files.map((file, key) => (
              <li key={key}>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="fileInfo">
                  <MdInsertDriveFile size={24} color="a5cfff" />
                  <strong>{file.title}</strong>
                </a>

                <span>
                  há{" "}
                  {distanceInWords(file.createdAt, new Date(), {
                    locale: pt
                  })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
