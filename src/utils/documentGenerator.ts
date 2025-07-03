import { DocumentTemplate } from '../data/documentTemplates';

export const generateDocument = (
  template: DocumentTemplate,
  data: Record<string, string>
): string => {
  let content = template.template;
  
  // Add current date
  const currentDate = new Date().toLocaleDateString('ko-KR');
  data.current_date = currentDate;
  
  // Replace all placeholders with actual data
  Object.entries(data).forEach(([key, value]) => {
    const placeholder = `{${key}}`;
    content = content.replace(new RegExp(placeholder, 'g'), value || '[입력필요]');
  });
  
  return content;
};

export const downloadTextFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const validateRequiredFields = (
  template: DocumentTemplate,
  data: Record<string, string>
): string[] => {
  const missingFields: string[] = [];
  
  template.fields.forEach(field => {
    if (field.required && !data[field.id]?.trim()) {
      missingFields.push(field.label);
    }
  });
  
  return missingFields;
};