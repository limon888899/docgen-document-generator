import type { ComponentType } from 'react';

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'date';
  placeholder: string;
  defaultValue: string;
}

export interface TemplateFieldGroup {
  title: string;
  fields: TemplateField[];
}

export interface TemplateConfig {
  key: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  fieldGroups: TemplateFieldGroup[];
  component: ComponentType<Record<string, string>>;
  accentColor: string;
}

export type FormData = Record<string, string>;
