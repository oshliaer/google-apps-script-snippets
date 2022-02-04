/* global Instances */

const DEFAULT_PROJECT = {
  project: 'unidraft',
  zone: 'us-central1-a',
};

/**
 *
 */
function runStop() {
  const request = Object.assign(DEFAULT_PROJECT, { filter: 'name=instance-1' });
  const instances = JSON.parse(Instances.list(request).getContentText());
  const res = {};
  if (instances && instances.items)
    res.stops = instances.items.map((item) =>
      JSON.parse(Instances.stop(Object.assign(DEFAULT_PROJECT, { resourceId: item.id })).getContentText())
    );
  else res.other = instances;
  console.log(res);
}

/**
 *
 */
function runStart() {
  const reques = Object.assign(DEFAULT_PROJECT, { filter: 'name=instance-1' });
  const instances = JSON.parse(Instances.list(reques).getContentText());
  const res = {};
  if (instances && instances.items)
    res.starts = instances.items.map((item) =>
      JSON.parse(Instances.start(Object.assign(DEFAULT_PROJECT, { resourceId: item.id })).getContentText())
    );
  else res.other = instances;
  console.log(res);
}
