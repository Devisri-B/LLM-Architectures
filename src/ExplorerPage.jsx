import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './ExplorerPage.css';


import CodexArchitecture from './architectures/Codex';
import SoraArchitecture from './architectures/SoraArchitecture';
import DeepSeekCoderV2Architecture from './architectures/DeepSeekCoderV2Architecture';
import LlamaPythonArchitecture from './architectures/LlamaPythonArchitecture';
import QwenBaseArchitecture from './architectures/QwenBaseArchitecture';
import Dalle3Architecture from './architectures/Dalle3Architecture';
import WhisperArchitecture from './architectures/WhisperArchitecture';
import GeminiUltraArchitecture from './architectures/GeminiUltraArchitecture';
import Dalle2Architecture from './architectures/Dalle2Architecture';
import JanusProArchitecture from './architectures/JanusProArchitecture';
import Gemini15Architecture from './architectures/Gemini15Architecture';
import LlamaInstructArchitecture from './architectures/LlamaInstructArchitecture';
import QwenChatArchitecture from './architectures/QwenChatArchitecture';
import GeminiNano2Architecture from './architectures/GeminiNano2Architecture';
import GeminiNano1Architecture from './architectures/GeminiNano1Architecture';
import CodeQwenArchitecture from './architectures/CodeQwenArchitecture';
import MathQwenArchitecture from './architectures/MathQwenArchitecture';
import GeminiBaseArchitecture from './architectures/GeminiBaseArchitecture';
import CodeLlamaBaseArchitecture from './architectures/CodeLlamaBaseArchitecture';

import GPT1 from './architectures/GPT-1';
import GPT2 from './architectures/GPT-2';
import GPT3 from './architectures/GPT-3';
import GPT35 from './architectures/GPT-3.5';
import GPT4 from './architectures/GPT-4';
import GPT4o from './architectures/GPT-4o';
import GPTo1Mini from './architectures/GPT-o1-mini';
import GPTo1Preview from './architectures/GPT-o1-preview';
import Gemini from './architectures/Gemini';
import Claude2 from './architectures/Claude2';
import Claude35Haiku from './architectures/Claude35Haiku';
import Claude3Haiku from './architectures/Claude3Haiku';
import Claude3Opus from './architectures/Claude3Opus';
import Claude3Sonnet from './architectures/Claude3Sonnet';
import Llama from './architectures/Llama';
import Llama2 from './architectures/Llama2';
import Lamda from './architectures/Lamda';
import Qwen from './architectures/Qwen';
import DeepSeekR1 from './architectures/DeepSeek-R1';
import DeepSeekV3 from './architectures/DeepSeek-V3';




// --- Data and Configuration ---

const architectureMapping = {
  "Codex": CodexArchitecture,
  "Sora": SoraArchitecture,
  "DeepSeekCoder-V2": DeepSeekCoderV2Architecture,
  "Code Llama-Python": LlamaPythonArchitecture,
  "DALL·E 3": Dalle3Architecture,
  "DALL·E 2": Dalle2Architecture,
  "Whisper": WhisperArchitecture,
  "Janus-Pro-7B": JanusProArchitecture,
  "Claude 2": Claude2,
  "Claude 3 Opus": Claude3Opus,
  "Claude 3 Sonnet": Claude3Sonnet,
  "Claude 3 Haiku": Claude3Haiku,
  "Claude 3.5 Haiku": Claude35Haiku,
  "GPT-1": GPT1,
  "GPT-2": GPT2,
  "GPT-3": GPT3,
  "GPT-3.5": GPT35,
  "GPT-4": GPT4,
  "GPT-4o": GPT4o,
  "O1-preview": GPTo1Preview,
  "O1-mini": GPTo1Mini,
  "Gemini": Gemini,
  "GeminiBase": GeminiBaseArchitecture,
  "Gemini1.5": Gemini15Architecture,
  "GeminiNano-1": GeminiNano1Architecture,
  "GeminiNano-2": GeminiNano2Architecture,
  "GeminiUltra": GeminiUltraArchitecture,
  "LLaMA": Llama,
  "LLaMA 2": Llama2,
  "Code Llama": CodeLlamaBaseArchitecture,
  "Code Llama-Instruct": LlamaInstructArchitecture,
  "Lamda": Lamda,
  "Qwen": Qwen,
  "Qwen-Base": QwenBaseArchitecture,
  "Qwen-Chat": QwenChatArchitecture,
  "Code-Qwen": CodeQwenArchitecture,
  "Math-Qwen": MathQwenArchitecture,
  "DeepSeek-R1": DeepSeekR1,
  "DeepSeek-V3": DeepSeekV3,
};

const detailFields = [
  "Developer", "Architecture", "Training Data", "Parameters", "Attention Mechanism",
  "Text Generation", "Language Translation", "Code Generation", "Image Generation",
  "Video Generation", "Summarization", "Question Answering", "Safety Features",
  "Creativity", "Versatility", "Privacy Concerns", "Bias and Misinformation",
  "Architecture Diagram" // Keep this for selection, handle rendering separately
];

// --- Helper Components ---

const LoadingSpinner = () => <div className="Loading">Loading data...</div>;
const ErrorMessage = ({ message }) => <div className="Error">Error: {message}</div>;

const Header = ({ onNavigateHome, onNavigateCompare }) => (
  <header className="Header">
    <h1 className="Header__Title" onClick={onNavigateHome}>LLM Model Explorer</h1>
    <nav className="Header__Nav">
      <button type="button" className="Header__NavLink" onClick={onNavigateHome}>Home</button>
      <button type="button" className="Header__NavLink" onClick={onNavigateCompare}>Compare Models</button>
    </nav>
  </header>
);

const Breadcrumbs = ({ items }) => (
  <nav aria-label="breadcrumb" className="Breadcrumbs">
    {items.map((item, index) => (
      <span key={index}>
        {item.onClick ? (
          <button type="button" className="Breadcrumbs__Link" onClick={item.onClick}>{item.label}</button>
        ) : (
          <span className="Breadcrumbs__Current">{item.label}</span>
        )}
        {index < items.length - 1 && <span className="Breadcrumbs__Separator">&gt;</span>}
      </span>
    ))}
  </nav>
);

const Card = ({ title, imageUrl, onClick, imageAlt = "" }) => (
  <div className="Card" onClick={onClick}>
     {imageUrl && <img src={imageUrl} alt={imageAlt || `${title} logo`} className="Card__Image" />}
    <h3 className="Card__Title">{title}</h3>
  </div>
);

const FeatureSelector = ({ features, selectedFeatures, onSelectionChange, title = "Select Features" }) => {
    const handleSelectAllChange = (e) => {
        onSelectionChange(e.target.checked ? features : []);
    };

    const handleFeatureChange = (e, feature) => {
        const isChecked = e.target.checked;
        onSelectionChange(prev =>
            isChecked ? [...prev, feature] : prev.filter(f => f !== feature)
        );
    };

    const isAllSelected = useMemo(() => features.length > 0 && selectedFeatures.length === features.length, [features, selectedFeatures]);

    return (
        <div className="FormSection">
            <h3>{title}</h3>
             <label className="CheckboxLabel SelectAllLabel">
                <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAllChange}
                    aria-label="Select all features"
                /> Select All
            </label>
            <div className="CheckboxGrid">
                {features.map(field => (
                    <label key={field} className="CheckboxLabel">
                        <input
                            type="checkbox"
                            value={field}
                            checked={selectedFeatures.includes(field)}
                            onChange={(e) => handleFeatureChange(e, field)}
                        /> {field}
                    </label>
                ))}
            </div>
        </div>
    );
};

const ArchitectureDiagram = ({ modelName }) => {
    const DiagramComponent = architectureMapping[modelName];
    if (!DiagramComponent) return <span>Architecture diagram not available for {modelName}</span>;
    return (
        <div className="DiagramWrapper" style={{ margin: '20px 0', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
            <DiagramComponent />
        </div>
    );
};


// --- View Components ---

const HomeView = ({ companies, onSelectCompany }) => (
  <div className="Grid" id="company-grid">
    {Object.entries(companies).map(([key, company]) => (
      <Card
        key={key}
        title={company.name}
        imageUrl={company.image}
        onClick={() => onSelectCompany(key)}
        imageAlt={company.name}
      />
    ))}
  </div>
);

const ModelsView = ({ company, onSelectModel, onGoBack }) => (
  <div>
    <h2>{company?.name} Models</h2>
    <div className="Grid" id="model-grid">
      {company?.models.map(model => (
        <Card
          key={model.name}
          title={model.name}
          onClick={() => onSelectModel(model.name)}
        />
      ))}
    </div>
    <button className="Button Button--secondary" onClick={onGoBack}>Back to Companies</button>
  </div>
);

const DetailsView = ({ company, model, selectedFeatures, onFeatureSelectionChange, onGoBackToModels }) => {
    if (!model) return <p>Model details not found.</p>;

    const renderDetailItem = (field) => {
        if (field === "Architecture Diagram") {
            return architectureMapping[model.name] ? <ArchitectureDiagram modelName={model.name} /> : <i>Diagram not available</i>;
        }
        return model.features[field] || "N/A";
    }

    return (
        <div>
            <h2>{model.name} Details</h2>
            <FeatureSelector
                features={detailFields}
                selectedFeatures={selectedFeatures}
                onSelectionChange={onFeatureSelectionChange}
                title="Show Features"
            />
            {selectedFeatures.length > 0 ? (
                 <div className="DetailsOutput">
                    {selectedFeatures.map(field => (
                        <div key={field} className="DetailsOutput__Item">
                            <strong>{field}:</strong>
                            {renderDetailItem(field)}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Select features above to view details.</p>
            )}

            <button className="Button Button--secondary" onClick={onGoBackToModels}>Back to {company?.name} Models</button>
        </div>
    );
};

const CompareView = ({ companies, selectedFeatures, onFeatureSelectionChange, selectedModels, onModelSelectionChange, onGoBack }) => {

    const allModelsFlat = useMemo(() => (
        Object.entries(companies).flatMap(([companyKey, company]) =>
            company.models.map(model => ({
                id: `${companyKey}_${model.name}`,
                name: model.name,
                companyName: company.name,
                companyKey: companyKey,
                features: model.features
            }))
        )
    ), [companies]);

    const selectedModelDetails = useMemo(() => (
        allModelsFlat.filter(model => selectedModels.includes(model.id))
    ), [allModelsFlat, selectedModels]);


     const renderComparisonTable = () => {
        if (selectedFeatures.length === 0 || selectedModels.length === 0) {
            return <p>Please select at least one feature and one model to compare.</p>;
        }
        return (
            <table className="ComparisonTable">
                <thead>
                    <tr>
                        <th>Feature</th>
                        {selectedModelDetails.map(model => (
                            <th key={model.id}>{model.name} <small>({model.companyName})</small></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {selectedFeatures.map(feature => (
                        <tr key={feature}>
                            <td>{feature}</td>
                            {selectedModelDetails.map(model => (
                                <td key={`${model.id}-${feature}`}>
                                    {feature === "Architecture Diagram" ? (
                                        <ArchitectureDiagram modelName={model.name} />
                                    ) : (
                                        model.features[feature] || "N/A"
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
         <div>
            <h2>Compare Models</h2>
            <div className="CompareContainer">
                <div className="CompareSelection">
                     <FeatureSelector
                        features={detailFields}
                        selectedFeatures={selectedFeatures}
                        onSelectionChange={onFeatureSelectionChange}
                    />

                     <div className="FormSection">
                         <h3>Select Models</h3>
                         {Object.entries(companies).map(([companyKey, company]) => (
                            <div key={companyKey} className="CompanyGroup">
                                <h4>{company.name}</h4>
                                <div className="ModelCardsContainer">
                                {company.models.map(model => {
                                    const modelId = `${companyKey}_${model.name}`;
                                    const isSelected = selectedModels.includes(modelId);
                                    return (
                                    <div
                                        key={modelId}
                                        className={`ModelCard ${isSelected ? "ModelCard--selected" : ""}`}
                                        onClick={() => onModelSelectionChange(modelId)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex="0" // Make it focusable
                                    >
                                        {model.name}
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                        ))}
                     </div>
                 </div>

                 <div className="CompareOutput">
                    <h3>Comparison Result</h3>
                    {renderComparisonTable()}
                 </div>
            </div>
             <button className="Button Button--secondary" onClick={onGoBack}>Back to Home</button>
         </div>
    );
};


// --- Main Explorer Page Component ---

const ExplorerPage = () => {
  const [view, setView] = useState("home"); // home, models, details, compare
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCompanyKey, setCurrentCompanyKey] = useState(null);
  const [currentModelName, setCurrentModelName] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState(detailFields.filter(f => f !== 'Architecture Diagram')); // Default selection
  const [selectedCompareModels, setSelectedCompareModels] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

    // --- Breadcrumb Management ---
    const updateBreadcrumbs = useCallback((targetView, companyKey = currentCompanyKey, modelName = currentModelName) => {
      const homeCrumb = { label: "Home", onClick: () => { setView("home"); setCurrentCompanyKey(null); setCurrentModelName(null); } };
      let newBreadcrumbs = [homeCrumb];
      const company = companies[companyKey];

      switch (targetView) {
        case "models":
          if (company) newBreadcrumbs.push({ label: company.name });
          break;
        case "details":
          if (company) newBreadcrumbs.push({ label: company.name, onClick: () => { setView("models"); setCurrentCompanyKey(companyKey); setCurrentModelName(null); } });
          if (modelName) newBreadcrumbs.push({ label: modelName });
          break;
        case "compare":
          newBreadcrumbs.push({ label: "Compare Models" });
          break;
        case "home":
        default:
          // Just the home crumb
          break;
      }
      setBreadcrumbs(newBreadcrumbs);
    }, [companies, currentCompanyKey, currentModelName]);

  // --- Data Fetching ---
  useEffect(() => {
    fetch('./data.json')
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
      .then(data => {
        setCompanies(data.companies || {}); // Ensure companies is always an object
        setLoading(false);
        updateBreadcrumbs("home"); // Initial breadcrumb
      })
      .catch(error => {
        console.error("Error loading data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [updateBreadcrumbs]);

  // --- Navigation Logic ---
  const navigateTo = useCallback((targetView, companyKey = null, modelName = null) => {
     setView(targetView);
     setCurrentCompanyKey(companyKey);
     setCurrentModelName(modelName);
     updateBreadcrumbs(targetView, companyKey, modelName);

     // Reset selections when navigating away from compare/details
     if (targetView !== 'compare') setSelectedCompareModels([]);
     if (targetView !== 'details') setSelectedFeatures(detailFields.filter(f => f !== 'Architecture Diagram')); // Reset features or keep? User preference needed. Let's reset.
  }, [updateBreadcrumbs]);

    const showHome = useCallback(() => navigateTo("home"), [navigateTo]);
    const showModels = useCallback((companyKey) => navigateTo("models", companyKey), [navigateTo]);
    const showDetails = useCallback((companyKey, modelName) => navigateTo("details", companyKey, modelName), [navigateTo]);
    const showComparePage = useCallback(() => navigateTo("compare"), [navigateTo]);


   // --- Selection Handlers ---
   const handleCompareModelToggle = useCallback((modelId) => {
        setSelectedCompareModels(prev =>
            prev.includes(modelId) ? prev.filter(id => id !== modelId) : [...prev, modelId]
        );
   }, []);

   const handleFeatureSelectionChange = useCallback((newSelection) => {
       setSelectedFeatures(newSelection);
   }, []);


   // --- Derived State ---
   const currentCompany = useMemo(() => companies[currentCompanyKey], [companies, currentCompanyKey]);
   const currentModel = useMemo(() => currentCompany?.models.find(m => m.name === currentModelName), [currentCompany, currentModelName]);

  // --- Content Rendering ---
  const renderContent = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (Object.keys(companies).length === 0 && !loading) return <p>No company data loaded.</p>;


    switch (view) {
      case "home":
        return <HomeView companies={companies} onSelectCompany={showModels} />;
      case "models":
        return <ModelsView company={currentCompany} onSelectModel={(modelName) => showDetails(currentCompanyKey, modelName)} onGoBack={showHome} />;
      case "details":
        return <DetailsView
                    company={currentCompany}
                    model={currentModel}
                    selectedFeatures={selectedFeatures}
                    onFeatureSelectionChange={handleFeatureSelectionChange}
                    onGoBackToModels={() => showModels(currentCompanyKey)}
                 />;
      case "compare":
        return <CompareView
                    companies={companies}
                    selectedFeatures={selectedFeatures}
                    onFeatureSelectionChange={handleFeatureSelectionChange}
                    selectedModels={selectedCompareModels}
                    onModelSelectionChange={handleCompareModelToggle}
                    onGoBack={showHome}
                />;
      default:
        return <HomeView companies={companies} onSelectCompany={showModels} />; // Fallback to home
    }
  };

  return (
    <div>
      <Header onNavigateHome={showHome} onNavigateCompare={showComparePage} />
      <main className="MainContent">
        <Breadcrumbs items={breadcrumbs} />
        <div id="content">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ExplorerPage;