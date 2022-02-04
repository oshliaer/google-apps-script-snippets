/* exported Instances */

const Instances = ((self) => {
  /**
   * List instances
   * @param {{
   *   project: string,
   *   zone: string
   * }} request
   * @param {GoogleAppsScript.URL_Fetch.URLFetchRequestOptions} urlFetchRequestOptions
   * @return {GoogleAppsScript.URL_Fetch.HTTPResponse}
   */
  const list = (request, urlFetchRequestOptions) => {
    const host = 'https://compute.googleapis.com/compute/v1/projects';
    const pathParamsNames = ['project', 'zone'];
    const pathParams = Object.keys(request).reduce((p, c) => {
      if (pathParamsNames.includes(c)) p[c] = request[c];
      return p;
    }, {});
    const queryParams = Object.keys(request)
      .reduce((p, c) => (pathParamsNames.includes(c) ? p : p.push(`${c}=${decodeURIComponent(request[c])}`) && p), [])
      .join('&');
    const url = `${host}/${pathParams.project}/zones/${pathParams.zone}/instances${
      queryParams.length ? '?' : ''
    }${queryParams}`;

    console.log(url);
    const options = Object.assign(
      {
        headers: {
          Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
        },
        muteHttpExceptions: true,
      },
      urlFetchRequestOptions
    );
    return UrlFetchApp.fetch(url, options);
  };

  /**
   * Stop the instance
   * @param {{
   *   project: string,
   *   zone: string,
   *   resourceId: string,
   *   requestId: string
   * }} request
   * @param {GoogleAppsScript.URL_Fetch.URLFetchRequestOptions} urlFetchRequestOptions
   * @return {GoogleAppsScript.URL_Fetch.HTTPResponse}
   */
  const stop = (request, urlFetchRequestOptions) => {
    const host = 'https://compute.googleapis.com/compute/v1/projects';
    const pathParamsNames = ['project', 'zone', 'resourceId'];
    const pathParams = Object.keys(request).reduce((p, c) => {
      if (pathParamsNames.includes(c)) p[c] = request[c];
      return p;
    }, {});
    const queryParams = Object.keys(request)
      .reduce((p, c) => (pathParamsNames.includes(c) ? p : p.push(`${c}=${decodeURIComponent(request[c])}`) && p), [])
      .join('&');
    const url = `${host}/${pathParams.project}/zones/${pathParams.zone}/instances/${pathParams.resourceId}/stop${
      queryParams.length ? '?' : ''
    }${queryParams}`;
    const options = Object.assign(
      {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
        },
        muteHttpExceptions: true,
      },
      urlFetchRequestOptions
    );
    return UrlFetchApp.fetch(url, options);
  };

  /**
   * Start the instance
   * @param {{
   *   project: string,
   *   zone: string,
   *   resourceId: string,
   *   requestId: string
   * }} request
   * @param {GoogleAppsScript.URL_Fetch.URLFetchRequestOptions} urlFetchRequestOptions
   * @return {GoogleAppsScript.URL_Fetch.HTTPResponse}
   */
  const start = (request, urlFetchRequestOptions) => {
    const host = 'https://compute.googleapis.com/compute/v1/projects';
    const pathParamsNames = ['project', 'zone', 'resourceId'];
    const pathParams = Object.keys(request).reduce((p, c) => {
      if (pathParamsNames.includes(c)) p[c] = request[c];
      return p;
    }, {});
    const queryParams = Object.keys(request)
      .reduce((p, c) => (pathParamsNames.includes(c) ? p : p.push(`${c}=${decodeURIComponent(request[c])}`) && p), [])
      .join('&');
    const url = `${host}/${pathParams.project}/zones/${pathParams.zone}/instances/${pathParams.resourceId}/start${
      queryParams.length ? '?' : ''
    }${queryParams}`;
    const options = Object.assign(
      {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
        },
        muteHttpExceptions: true,
      },
      urlFetchRequestOptions
    );
    return UrlFetchApp.fetch(url, options);
  };

  return { self: self, stop: stop, start: start, list: list };
})(this);
