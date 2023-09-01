import React from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { LocaleStringsSourceOptions } from '../types';

/**
 * Component properties
 */
interface Props extends DataSourcePluginOptionsEditorProps<LocaleStringsSourceOptions> {

};

/**
 * ConfigEditor component
 * 
 * @param props
 */
export const ConfigEditor = ({ }: Props) => {
  return (
    <div className="gf-form-group">
    </div>
  );
};
