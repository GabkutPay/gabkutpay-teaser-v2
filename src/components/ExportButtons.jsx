import React from 'react';
import axios from 'axios';

const ExportButtons = ({ endpoint, filename }) => {
  const exportPDF = () => {
    window.open(`/api/export/pdf?source=${endpoint}&name=${filename}.pdf`, '_blank');
  };

  const exportExcel = () => {
    window.open(`/api/export/excel?source=${endpoint}&name=${filename}.xlsx`, '_blank');
  };

  return (
    <div className="flex gap-2 mb-4">
      <button onClick={exportPDF} className="bg-red-600 text-white px-3 py-1 rounded">📄 Export PDF</button>
      <button onClick={exportExcel} className="bg-green-600 text-white px-3 py-1 rounded">📊 Export Excel</button>
    </div>
  );
};

export default ExportButtons;
