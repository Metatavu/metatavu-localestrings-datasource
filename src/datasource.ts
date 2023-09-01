import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
  StandardVariableSupport,
  StandardVariableQuery,
} from '@grafana/data';

import { LocaleBundle, LocaleStringsQuery, LocaleStringsSourceOptions } from './types';
import * as arSa from './locales/ar-SA.json';
import * as enUs from './locales/en-US.json';
import * as fiFi from './locales/fi-FI.json';
import { config } from '@grafana/runtime';

/**
 * Provides variable support for the datasource.
 */
class VariableSupport extends StandardVariableSupport<DataSource, LocaleStringsQuery, LocaleStringsSourceOptions> {
  
  /**
   * Converts a standard variable query to a data query.
   * 
   * @param query query to convert
   * @returns data query
   */
  public toDataQuery(query: StandardVariableQuery): LocaleStringsQuery {
    return {
      refId: query.refId,
      language: config.bootData.user.language,
      key: query.query,
    };
  }
};

/**
 * Locale strings datasource.
 */
export class DataSource extends DataSourceApi<LocaleStringsQuery, LocaleStringsSourceOptions> {

  /**
   * Constructor.
   * 
   * @param instanceSettings datasource instance settings
   */
  constructor(instanceSettings: DataSourceInstanceSettings<LocaleStringsSourceOptions>) {
    super(instanceSettings);

    this.variables = new VariableSupport();
  }

  /**
   * Executes a query.
   * 
   * @param options options
   * @returns query result
   */
  public query = async (options: DataQueryRequest<LocaleStringsQuery>): Promise<DataQueryResponse> => {
    const data = options.targets.map((target) => {
      return new MutableDataFrame({
        refId: target.refId,
        fields: [
          { name: 'Value', values: [ this.getLocaleText(target.language, target.key) ], type: FieldType.string },
        ],
      });
    });

    return { data: data };
  }

  /**
   * Tests the datasource.
   * 
   * @returns test result
   */
  public testDatasource = async () => {
    return {
      status: 'success',
      message: 'Success',
    };
  }

  /**
   * Returns the locale bundle for the given locale.
   * 
   * @param locale locale to use
   * @returns locale bundle
   */
  private getBundle(locale: string): LocaleBundle {
    switch (locale) {
      case 'ar-SA':
        return arSa;
      case 'fi-FI':
        return fiFi;        
      default:
        return enUs;      
    }
  };

  /**
   * Returns localized text for the given locale and key.
   * 
   * @param locale locale to use
   * @param key locale key
   * @returns localized text or null
   */
  private getLocaleText = (locale: string, key: string) => {
      return (this.getBundle(locale))[key] || key;
  };
}
