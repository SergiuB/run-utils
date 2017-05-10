import R from 'ramda';
import { parse } from './workoutParser'
import { calculate } from './workoutCalculator';

const calc47 = R.compose(calculate(47), parse);

it('calculates for easy run', () => {
  expect(calc47('2kmE')).toEqual({
    distance: 2,
    time: 11.13,
    points: 2.23,
    zones: {
      E: {
        distance: 2,
        time: 11.13,
        points: 2.23,
      }
    }
  });
});

it('calculates for tempo', () => {
  expect(calc47('20\'T')).toEqual({
    distance: 4.46,
    time: 20,
    points: 12,
    zones: {
      T: {
        distance: 4.46,
        time: 20,
        points: 12,
      }
    }
  });
});

it('calculates for repetitions', () => {
  expect(calc47('2*400mR')).toEqual({
    distance: 0.8,
    time: 3.06,
    points: 4.60,
    zones: {
      R: {
        distance: 0.8,
        time: 3.06,
        points: 4.60,
      }
    }
  });
});

it('calculates for intervals with rest', () => {
  expect(calc47('3*1miI/400m')).toEqual({
    distance: 6.03,
    time: 27.18,
    points: 21.36,
    zones: {
      E: {                                                                                                                  
        distance: 1.2,                                                                                                                 
        points: 1.47,                                                                                                                  
        time: 7.29,  
      },
      I: {                                                                                                                 
        distance: 4.83,                                                                                                                
        points: 19.89,                                                                                                                 
        time: 19.89,  
      }
    }
  });
});



it('calculates for sequence of work parts', () => {
  expect(calc47('20\'T+3*1miI/90"')).toEqual({                                                                                                                    
    distance: 10.04,                                                                                                                   
    points: 32.79,                                                                                                                     
    time: 44.39,   
    zones: {
      E: {                                                                                                                  
        distance: 0.75,                                                                                                                 
        points: 0.9,                                                                                                                  
        time: 4.5,  
      },
      I: {                                                                                                                 
        distance: 4.83,                                                                                                                
        points: 19.89,                                                                                                                 
        time: 19.89,  
      },                                                                                                                           
      T: {                                                                                                                      
        distance: 4.46,                                                                                                                
        points: 12,                                                                                                                    
        time: 20,                                                                                                                      
      },      
    }
  });
});

it('calculates for another sequence of work parts', () => {
  expect(calc47('2kmE+30\'M+20\'T+30\'M+2kmE')).toEqual({
    distance: 21.06,                                                                                                                    
    time: 102.26,                                                                                                                       
    points: 40.46,                                                                                                                      
    zones: {
      E: { distance: 4, time: 22.26, points: 4.46 },                                                                                   
      M: { distance: 12.6, time: 60, points: 24 },                                                                                     
      T: { distance: 4.46, time: 20, points: 12 } 
    }
  });
});
