import R from 'ramda';
import { parse } from './workoutParser';

it('parses basic workouts', () => {
  expect(parse('2kmE')).toEqual({
    'type': 'E',
    'work': {
      'num': 2,
      'unit': 'km',
    }
  });

  expect(parse('20\'T')).toEqual({
    'type': 'T',
    'work': {
      'num': 20,
      'unit': '\'',
    }
  });  
});

it('parses interval workouts', () => {
  expect(parse("1200mT/3'")).toEqual({
    "work": {
        "num": 1200,
        "unit": "m"
    },
    "type": "T",
    "rest": {
        "num": 3,
        "unit": "'"
    }
  });

  expect(parse('400mR/400m')).toEqual({
    "work": {
        "num": 400,
        "unit": "m"
    },
    "type": "R",
    "rest": {
        "num": 400,
        "unit": "m"
    }
  });  
});

it('parses workout sequences', () => {
  expect(parse("3200mE+2*(3*400mR/400m+5kmT+3*3'I/20\")+3200mE")).toEqual([
    {
        "work": {
          "num": 3200,
          "unit": "m"
        },
        "type": "E"
    },
    {
        "times": 2,
        "work": [
          {
              "times": 3,
              "work": {
                "work": {
                    "num": 400,
                    "unit": "m"
                },
                "type": "R",
                "rest": {
                    "num": 400,
                    "unit": "m"
                }
              }
          },
          {
              "work": {
                "num": 5,
                "unit": "km"
              },
              "type": "T"
          },
          {
              "times": 3,
              "work": {
                "work": {
                    "num": 3,
                    "unit": "'"
                },
                "type": "I",
                "rest": {
                    "num": 20,
                    "unit": "\""
                }
              }
          }
        ]
    },
    {
        "work": {
          "num": 3200,
          "unit": "m"
        },
        "type": "E"
    }
  ]);
});