/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import styles from "./form.field.css";

const BoxRefernceField = (props) => {
  const { value = [], field, actions, fetchKfApi } = props;
  let {
    updateValue = () => {}, // Update the 'model', don't call the http api to update the db yet.
    validateField, // should return true or false.
  } = actions || {};
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(value);

  const onOpenModel = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFileSelect = (value) => {
    setFiles(value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        style={{ marginBottom: "2rem" }}
        onClick={() => {
          localStorage.removeItem("clientId");
          localStorage.removeItem("clientSecret");
          setFiles([]);
        }}
      >
        Clear
      </button>
      <button onClick={onOpenModel}>Reference files</button>
      <BoxReferenceAttachments files={files} />
      <BoxReferenceModel
        open={open}
        onClose={onClose}
        onFileSelect={onFileSelect}
        updateValue={updateValue}
      />
    </div>
  );
};

export const BoxReferenceAttachments = ({ files = [] }) => {
  return (
    <div className={styles.files}>
      {(files ?? []).map((file) => (
        <a
          key={file.id}
          href={`https://app.box.com/file/${file.id}`}
          target="_blank"
          className={styles.file}
          rel="noreferrer"
        >
          <div className={styles["file-body"]}>
            <div className={styles["file-name"]}>Name: {file.name}</div>
            <div className={styles["file-size"]}>Size: {file.size}</div>
          </div>
        </a>
      ))}
    </div>
  );
};

export const BoxReferenceModel = ({
  open,
  onClose,
  onFileSelect,
  updateValue,
}) => {
  if (!open) return null;

  return (
    <div className={styles["box-model"]}>
      <div className={styles["box-conatainer"]}>
        <div className={styles["box-close"]}>
          <button onClick={onClose}>X</button>
        </div>
        <div className={styles["box-body"]}>
          <BoxBody onFileSelect={onFileSelect} updateValue={updateValue} />
        </div>
      </div>
    </div>
  );
};

export const BoxBody = ({ onFileSelect, updateValue }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("clientId"),
  );
  const [clientId, setClientId] = useState(
    localStorage.getItem("clientSecret"),
  );

  //   const onMessage = (e) => {
  //     let data = e.data;
  //     console.info(
  //       e,
  //       e.data,
  //       e.data.status,
  //       e.data.AccessToken,
  //       e.data.CurrentUser
  //     );
  //     if (data && data.id === "box") {
  //       setAccessToken(e.data.AccessToken);
  //       if (e.data.status && e.data.status === "error") {
  //       } else {
  //       }
  //       window.removeEventListener("message", this.onMessage);
  //     }
  //   };

  const onChangeToken = (token) => {
    localStorage.setItem("clientSecret", token);
    setAccessToken(token);
  };

  const onClientId = (value) => {
    localStorage.setItem("clientId", value);
    setClientId(value);
  };

  const onAuthenticate = () => {
    let url = `https://account.box.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&state=boxreference&redirect_uri=http://127.0.0.1:3001`;
    // window.addEventListener("message", onMessage);
    window.open(url, "_blank");
  };

  if (!accessToken)
    return (
      <BoxReferenceAllowAccess
        onAuthenticate={onAuthenticate}
        onChangeToken={onChangeToken}
        onClientId={onClientId}
      />
    );

  return (
    <div style={{ height: "100%" }}>
      <BoxWidget
        accessToken={accessToken}
        onFileSelect={onFileSelect}
        updateValue={updateValue}
      />
    </div>
  );
};

export const BoxReferenceAllowAccess = ({
  onAuthenticate,
  onChangeToken,
  onClientId,
}) => {
  const tokenInputref = useRef(null);
  const clientIdref = useRef(null);

  return (
    <div className={styles["allow-access"]}>
      <div
        style={{
          display: "flex",
          marginBottom: "1rem",
          flexDirection: "column",
          gap: "2px",
          border: "1px dashed red",
          padding: "5px",
        }}
      >
        <input type="text" ref={tokenInputref} placeholder="Enter ClientId" />
        <input type="text" ref={tokenInputref} placeholder="Enter Token" />
        <button
          onClick={() => {
            let value = tokenInputref.current.value;
            let clientId = clientIdref?.current?.value;
            onChangeToken(value);
            onClientId(clientId);
          }}
        >
          Submit
        </button>
      </div>
      <button onClick={onAuthenticate}>Allow Access</button>
    </div>
  );
};

export const BoxWidget = ({ accessToken, onFileSelect, updateValue }) => {
  useEffect(() => {
    if (!document.getElementById("boxjs")) {
      let scriptTag = document.createElement("script");
      scriptTag.setAttribute("id", "boxjs");
      scriptTag.src =
        "https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/picker.js";

      document.body.appendChild(scriptTag);
    }

    if (!document.getElementById("boxcss")) {
      let linkTag = document.createElement("link");
      linkTag.rel = "stylesheet";
      linkTag.id = "boxcss";
      linkTag.href =
        "https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/picker.css";
      document.head.appendChild(linkTag);
    }

    // Box Inject
    setTimeout(() => {
      let filePicker = new window.Box.FilePicker();

      // Attach event listener for when the choose button is pressed
      filePicker.addListener("choose", function (items = []) {
        let referencFiles = items.map((item) => ({
          id: item.id,
          name: item.name,
          size: item.size,
        }));
        onFileSelect(referencFiles);
        updateValue(referencFiles);
        console.log(JSON.stringify(items, null, 2));
      });

      // Attach event listener for when the cancel button is pressed
      filePicker.addListener("cancel", function () {
        // do something
      });

      // Show the file picker /
      filePicker.show("0", accessToken, {
        container: ".container",
        chooseButtonLabel: "Select",
        canUpload: true,
        canPreview: true,
      });
    }, 1000);
  }, [accessToken, onFileSelect]);

  return (
    <div style={{ height: "100%" }}>
      <div className={styles.container} />
    </div>
  );
};

export default BoxRefernceField;

