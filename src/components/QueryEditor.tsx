import React, { ChangeEvent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { LocaleStringsQuery, LocaleStringsSourceOptions } from '../types';

/**
 * Component properties
 */
type Props = QueryEditorProps<DataSource, LocaleStringsQuery, LocaleStringsSourceOptions>;

export const QueryEditor = ({ query, onChange, onRunQuery }: Props) => {

  /**
   * Language change handler
   * 
   * @param event event
   */
  const onLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, language: event.target.value });
    onRunQuery();
  };

  /**
   * Key change handler
   * 
   * @param event event
   */
  const onKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, key: event.target.value });
    onRunQuery();
  };

  const { language, key } = query;

  return (
    <div className="gf-form">
      <InlineField label="Language" labelWidth={16}>
        <Input onChange={onLanguageChange} value={language || ''} />
      </InlineField>
      <InlineField label="Key" labelWidth={16}>
        <Input onChange={onKeyChange} value={key || ''} />
      </InlineField>
    </div>
  );
};
