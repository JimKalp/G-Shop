import axios from "axios";
import React from "react";
import { UserContext } from "../context/user_context";

function UploadComponent({ prod }) {
  const [file, setFile] = React.useState();

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };
  const data = arrayBufferToBase64(prod.img.data.data);
  const p = `data:image/jpg;base64,${data}`;

  return (
    <UserContext.Consumer>
      {(state) => (
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append("uploaded_file", file);
              const config = {
                headers: {
                  "content-type": "multipart/form-data",
                },
              };
              axios
                .post("/profile", formData, config)
                .then((response) => {
                  alert("The file is successfully uploaded");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <div>
              <input
                type="file"
                name="uploaded_file"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </div>
            <div>
              <input type="submit" value="Sign up" />
            </div>
          </form>
          <img src={p} alt="" />
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default UploadComponent;
