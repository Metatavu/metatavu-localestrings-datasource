import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './datasource';
import { ConfigEditor } from './components/ConfigEditor';
import { QueryEditor } from './components/QueryEditor';
import { LocaleStringsQuery, LocaleStringsSourceOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, LocaleStringsQuery, LocaleStringsSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
