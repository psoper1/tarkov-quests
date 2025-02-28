"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import fence from "../imgs/Fence.png";
import jaeger from "../imgs/Jaeger.png";
import mechanic from "../imgs/Mechanic.png";
import peacekeeper from "../imgs/Peacekeeper.png";
import prapor from "../imgs/Prapor.png";
import ragman from "../imgs/Ragman.png";
import skier from "../imgs/Skier.png";
import therapist from "../imgs/Therapist.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const TOTAL_QUESTS = 245;
  const [completedQuests, setCompletedQuests] = useState(0);

  // Function to update progress
  const updateProgress = () => {
    const data = JSON.parse(localStorage.getItem("completedQuests") || "[]");
    setCompletedQuests(data.length);
  };

  useEffect(() => {
    // Initialize progress
    updateProgress();

    // Listen for changes in local storage
    const handleStorageChange = () => {
      updateProgress();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const progressPercentage = ((completedQuests / TOTAL_QUESTS) * 100).toFixed(1);

  // Navigate to trader pages
  const takeToPage = (page) => {
    router.push(`/${page}`);
  };

  // Export localStorage data to a JSON file
  const exportData = () => {
    const data = localStorage.getItem("completedQuests");
    if (data) {
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "completedQuests.json";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      alert("No data to export!");
    }
  };

  // Import JSON data and update localStorage
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (Array.isArray(importedData)) {
            localStorage.setItem("completedQuests", JSON.stringify(importedData));
            alert("Data successfully imported!");
            updateProgress();
          } else {
            alert("Invalid data format in JSON file.");
          }
        } catch (error) {
          alert("Failed to parse JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div className="warning-div">
        <div className="warning-message">
          <p className="kappa-text">KAPPA QUEST TRACKER</p>
          WARNING: READ BEFORE YOU CLEAR YOUR BROWSERS CACHE & COOKIES: Data is
          stored locally using LOCAL STORAGE. Clearing your cache & cookies will
          remove progress. To keep your data, click on the button below to
          export your progress and use the other button to import and upload
          the .JSON of your progress back to the site!
        </div>
      </div>
      <div className="main-page">
        <div className="progress-section">
          <div style={{ fontSize: "18px", marginBottom: "10px" }}>
            Progress: {completedQuests}/{TOTAL_QUESTS} ({progressPercentage}%)
          </div>
          <div style={{ width: "100%", height: "20px", backgroundColor: "#ddd", borderRadius: "10px" }}>
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                backgroundColor: "#4caf50",
                borderRadius: "10px",
                transition: "width 0.3s ease-in-out",
              }}
            ></div>
          </div>
        </div>
        <div className="trader-list">
          <div className="trader" onClick={() => takeToPage("prapor")}>
            <Image src={prapor} alt="prapor" />
            <div className="trader-name">Prapor</div>
          </div>
          <div className="trader" onClick={() => takeToPage("therapist")}>
            <Image src={therapist} alt="therapist" />
            <div className="trader-name">Therapist</div>
          </div>
          <div className="trader" onClick={() => takeToPage("fence")}>
            <Image src={fence} alt="fence" />
            <div className="trader-name">Fence</div>
          </div>
          <div className="trader" onClick={() => takeToPage("skier")}>
            <Image src={skier} alt="skier" />
            <div className="trader-name">Skier</div>
          </div>
          <div className="trader" onClick={() => takeToPage("peacekeeper")}>
            <Image src={peacekeeper} alt="peacekeeper" />
            <div className="trader-name">Peacekeeper</div>
          </div>
          <div className="trader" onClick={() => takeToPage("mechanic")}>
            <Image src={mechanic} alt="mechanic" />
            <div className="trader-name">Mechanic</div>
          </div>
          <div className="trader" onClick={() => takeToPage("ragman")}>
            <Image src={ragman} alt="ragman" />
            <div className="trader-name">Ragman</div>
          </div>
          <div className="trader" onClick={() => takeToPage("jaeger")}>
            <Image src={jaeger} alt="jaeger" />
            <div className="trader-name">Jaeger</div>
          </div>
          <div className="controls">
            <button onClick={exportData}>Export Progress</button>
            <input type="file" accept=".json" onChange={importData} />
          </div>
        </div>
      </div>
    </>
  );
}