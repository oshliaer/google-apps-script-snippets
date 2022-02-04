/**
 *
 */
class GCP {
  /**
   *
   */
  constructor() {}

  /**
   *
   * @param {object} obj
   */
  serialize(obj) {
    return Object.keys(obj)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&');
  }

  /**
   *
   * @param {{
   *   method: string,
   *   params: object,
   *   urlFetchRequestOptions: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
   * }} param0
   */
  api({ method, params, urlFetchRequestOptions }) {
    const __urlFetchRequestOptions__ = Object.assign(
      {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
        },
      },
      urlFetchRequestOptions
    );
    const __params__ = Object.assign({}, params !== null && typeof params === 'object' ? params : {});
    const __url__ = `https://www.google.com/cloudprint/${method}?${this.serialize(__params__)}`;
    return JSON.parse(UrlFetchApp.fetch(__url__, __urlFetchRequestOptions__).getContentText());
  }
  /**
   * https://developers.google.com/cloud-print/docs/appInterfaces#search
   * @param {*} params
   */
  search(params) {
    return this.api({
      method: 'search',
      params,
      urlFetchRequestOptions: { method: 'post' },
    });
  }
  /**
   * https://developers.google.com/cloud-print/docs/appInterfaces#submit
   * @param {*} params
   */
  submit(params) {
    return this.api({
      method: 'submit',
      params,
      urlFetchRequestOptions: { method: 'post' },
    });
  }
}
