import './Styles/Container.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuFileJson } from "react-icons/lu";
import { useState, useEffect } from "react";
import Button from './Button';

function Container({ action }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [platform, setPlatform] = useState('');
  const [transformOutput, setTransformOutput] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      setSelectedFile(file);
      setSuccess(false);
    } else {
      alert("Please upload a valid JSON file.");
    }
  };

  const handleLoadToMongo = async () => {
    if (!selectedFile) {
      alert("Please upload a file first in the 'Extract' section.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:9090/extract", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        setSuccess(true);
      } else {
        alert("❌ Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("🚫 Server error");
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };
  const handleTransform = async () => {
    if (!platform) return;

    try {
      const response = await fetch("http://localhost:9090/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform }),
      });

      if (response.ok) {
        const result = await response.text();
        setTransformOutput(result);
      } else {
        alert("❌ Transform failed");
      }
    } catch (error) {
      console.error("Transform error:", error);
      alert("🚫 Error during transformation");
    }
  };

  useEffect(() => {
    if (action === 'load' && selectedFile) {
      handleLoadToMongo();
    }
  }, [action, selectedFile]);

  useEffect(() => {
    if (action === 'transform' && platform) {
      handleTransform();
    }
  }, [action, platform]);

  return (
    <div className="content_display">
      {action === 'extract' && (
        <div className="chosefile">
          <h3>Drop a JSON file here</h3>
          <p className="arrow">👇🏾</p>

          <input
            type="file"
            id="fileUpload"
            accept=".json"
            onChange={handleFileChange}
            className="upload_input"
          />

          <label htmlFor="fileUpload" className="upload_button">
            <FaCloudUploadAlt className="upload_icon" />
            Choose File
          </label>

          {selectedFile && (
            <p className="file_name">Uploaded JSON file <LuFileJson /> {selectedFile.name}</p>
          )}
        </div>
      )}

      {action === 'load' && (
        <div className="load_section">
          {loading ? (
            <>
              <div className="spinner"></div>
              <p className="loading_text">Uploading JSON to MongoDB...</p>
            </>
          ) : success ? (
            <>
              <p className="success_text">✅ Successfully uploaded to MongoDB!</p>
              <select className="select_bar" value={platform} onChange={handlePlatformChange}>
                <option value="">-- Select Platform --</option>
                <option value="GITHUB">GITHUB</option>
                <option value="GITLAB">GITLAB</option>
                <option value="BITBUCKET">BitBucket</option>
                <option value="AZURE_DEVOPS">Azure DevOps</option>
              </select>
            </>
          ) : selectedFile ? (
            <p className="waiting_text">Preparing to upload...</p>
          ) : (
            <p className="waiting_text">⚠️ No file found. Please upload a JSON file in the first section.</p>
          )}
        </div>
      )}

      {action === "transform" && transformOutput && (
        <p className="output_text">🧩 Backend says: {transformOutput}</p>
      )}
    </div>
  );
}

export default Container;
