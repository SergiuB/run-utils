import R from 'ramda';

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
const k20 = {
  label: '20K',
  distance: 20,
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

const kEasyPace = { 
  label: 'Easy/Long',
  type: 'Easy',
  id: 'kEasyPace',
};
const kT400 = {
  label: '400m',
  type: 'LT',
  distance: 0.4,
  id: 'kT400',
};
const kT800 = {
  label: '800m',
  type: 'LT',
  distance: 0.8,
  id: 'kT800',
};
const kT1000 = {
  label: '1000m',
  type: 'LT',
  distance: 1,
  id: 'kT1000',
};
const kTMile = {
  label: 'Mile',
  type: 'LT',
  distance: kMile.distance,
  id: 'kTMile',
};
const kI400 = {
  label: '400m',
  type: 'VO2',
  distance: 0.4,
  id: 'kI400',
};
const kI1000 = {
  label: '1000m',
  type: 'VO2',
  distance: 1,
  id: 'kI1000',
};
const kI1200 = {
  label: '1200m',
  type: 'VO2',
  distance: 1.2,
  id: 'kI1200',
};
const kIMile = {
  label: 'Mile',
  type: 'VO2',
  distance: kMile.distance,
  id: 'kIMile',
};
const kR200 = {
  label: '200m',
  type: 'Speed',
  distance: 0.2,
  id: 'kR200',
};
const kR400 = {
  label: '400m',
  type: 'Speed',
  distance: 0.4,
  id: 'kR400',
};
const kR800 = {
  label: '800m',
  type: 'Speed',
  distance: 0.8,
  id: 'kR800',
};

const allIntensities = [
  kEasyPace,
  kT400,
  kT800,
  kT1000,
  kTMile,
  kI400, 
  kI1000,
  kI1200,
  kIMile,
  kR200,
  kR400,
  kR800,
];

const allIntensitiesObj = R.compose(
  R.map(R.head),
  R.groupBy(R.prop('id')),
)(allIntensities);

const allRaces = [
  kMarathon,
  k30,
  k25,
  kHalf,
  k20,
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
  allRaces,
  kMarathon,
  k30,
  k25,
  kHalf,
  k20,
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

  allIntensities,
  allIntensitiesObj,
  kEasyPace,
  kT400,
  kT800,
  kT1000,
  kTMile,
  kI400, 
  kI1000,
  kI1200,
  kIMile,
  kR200,
  kR400,
  kR800,
}