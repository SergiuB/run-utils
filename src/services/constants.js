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

const kEasyPace = 'Easy/Long Pace';
const kMarathonPace = 'Maraton Pace';
const kT400 = 'Threshold 400m';
const kT800 = 'Threshold 800m';
const kT1000 = 'Threshold 1000m';
const kTPoint68Mile = 'Threshold .68mile';
const kTMile = 'Threshold mile';
const kI400 = 'Interval 400m';
const kI800 = 'Interval 800m';
const kIPoint68Mile = 'Interval .68mile';
const kI1200 = 'Interval 1200m';
const kIMile = 'Interval mile';
const kR200 = 'Repetition 200m';
const kR400 = 'Repetition 400m';
const kR800 = 'Repetition 800m';

const allIntensities = [
  kEasyPace,
  kMarathonPace,
  kT400,
  kT800,
  kT1000,
  kTPoint68Mile,
  kTMile,
  kI400, 
  kI800,
  kIPoint68Mile,
  kI1200,
  kIMile,
  kR200,
  kR400,
  kR800,
];

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
  kEasyPace,
  kMarathonPace,
  kT400,
  kT800,
  kT1000,
  kTPoint68Mile,
  kTMile,
  kI400, 
  kI800,
  kIPoint68Mile,
  kI1200,
  kIMile,
  kR200,
  kR400,
  kR800,
}