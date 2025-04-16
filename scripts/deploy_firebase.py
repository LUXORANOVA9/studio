import shutil
from pathlib import Path

# Recreate React folder structure after kernel reset
project_root = Path("/mnt/data/luxoranova-react-app")
folders = [
    "src",
    "src/components",
    "src/pages",
    "src/hooks",
    "src/styles",
    "public"
]

# Create each folder
for folder in folders:
    (project_root / folder).mkdir(parents=True, exist_ok=True)

# Create basic wireframe files
files_content = {
    "src/pages/Mint.jsx": """import React from 'react';
export default function Mint() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Mint Your Clone Scroll</h1>
      {/* Wallet Connect + Mint Logic Here */}
    </div>
  );
}
""",
    "src/pages/Admin.jsx": """import React from 'react';
export default function Admin() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Mint Logs Admin View</h1>
      {/* Firestore Table Viewer */}
    </div>
  );
}
""",
    "src/App.jsx": """import React from 'react';
import Mint from './pages/Mint';
import Admin from './pages/Admin';

function App() {
  return (
    
        
          
        
        
          
        
      
  );
}

export default App;
""",
    "src/index.js": """import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render();
""",
    "src/styles/global.css": """body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
}""",
    "public/index.html": """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LuxoraNova Mint App</title>
</head>
<body>
  
</body>
</html>
"""
}

# Write content to each file
for file_path, content in files_content.items():
    (project_root / file_path).write_text(content.strip())

# Zip the directory
zip_path = shutil.make_archive(str(project_root), 'zip', str(project_root))
zip_path

