export interface Query {
  toQueryMap: (json: any) => any;
  toQueryString: () => string;
}
  

export class QueryOptions implements Query {
    private _map: Map<string, string>;
  
    constructor (json: any = null) {
      this._map =  new Map<string, any>();
      if (json) {
        this.toQueryMap(json);
      }
    }
  
    toQueryMap (json: any): QueryOptions {
      const keys = Object.keys(json);
      keys.forEach((key: string) => this._map.set(key, json[key]));
      return this;
    }
  
    toQueryString (): string {
      let queryString = '';
      this._map.forEach((value: string, key: string) => {
        queryString = queryString.concat(`${key}=${value}&`);
      });
      return queryString.substring(0, queryString.length - 1);
    }
  }
  