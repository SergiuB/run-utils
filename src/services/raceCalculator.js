const kMarathon = {
  label: 'Marathon',
  distance: 42.195,
};
const k30 = {
  label: '30K',
  distance: 30,
};
const k25 = {
  label: '25K',
  distance: 25,
};
const kHalf = {
  label: 'Half',
  distance: 42.195 / 2,
};
const k10M = {
  label: '10M',
  distance: 16.09344,
};
const k15 = {
  label: '15K',
  distance: 15,
};
const k10 = {
  label: '10K',
  distance: 10,
};
const k5M = {
  label: '5M',
  distance: 5 * 1.609344,
};
const k8= {
  label: '8K',
  distance: 8,
};
const k5 = {
  label: '5K',
  distance: 5,
};
const k2M = {
  label: '2M',
  distance: 2*1.609344,
};
const k3 = {
  label: '3K',
  distance: 3,
};
const kMile = {
  label: 'Mile',
  distance: 1.609344,
};
const k1500 = {
  label: '1500',
  distance: 1.5,
};

function raceTime(kph, km) {
  return km / kph * 3600;
}

function raceSpeed(sec, km) {
  return km / (sec / 3600);
}

const allRaces = [
  kMarathon,
  k30,
  k25,
  kHalf,
  k10M,
  k15,
  k10,
  k5M,
  k8,
  k5,
  k2M,
  k3,
  kMile,
  k1500,
]

export {
  raceTime,
  raceSpeed,
  allRaces,
  kMarathon,
  k30,
  k25,
  kHalf,
  k10M,
  k15,
  k10,
  k5M,
  k8,
  k5,
  k2M,
  k3,
  kMile,
  k1500,
}
